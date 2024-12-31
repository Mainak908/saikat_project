import { Tags } from "@prisma/client";
import axios from "axios";
import Bcrypt from "bcrypt";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { launch } from "puppeteer";
import { igoogleData, prisma } from "../client.js";
import { stocks } from "../data.js";
import { Cookiehelper } from "../helper.js";
import { CacheStock } from "../index.js";

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000 * 4, // 15 mins
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

interface idata {
  title: string;
  sections: { subtitle: string; content: string }[];
  image: string;
  tags: Tags;
  stock: string;
}
interface reqdata {
  postId: string;
  data: { subtitle: string; content: string; id: string }[];
  id: string;
}
async function getNifty50Value(stock: string) {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.google.com/finance/quote/${stock}:NSE`, {
      waitUntil: "domcontentloaded",
    });

    await Promise.allSettled([
      page.waitForSelector(".YMlKec.fxKbKc", { timeout: 30000 }),
      page.waitForSelector(".P2Luy.Ebnabc.ZYVHBb", { timeout: 30000 }),
      page.waitForSelector(".enJeMd .NydbP .JwB6zf", { timeout: 30000 }),
    ]);

    const data = await Promise.allSettled([
      page.$eval(".YMlKec.fxKbKc", (el) => el.textContent),
      page.$eval(".P2Luy.Ez2Ioe.ZYVHBb", (el) => el.textContent),
      page.$eval(".enJeMd .NydbP .JwB6zf", (el) => el.textContent),
    ]);
    const updatedData = data
      .filter((d) => d.status === "fulfilled")
      .map((d) => d.value);

    return updatedData;
  } catch (error) {
    console.log(`Error fetching ${stock} value:`, error);
  } finally {
    await browser.close();
  }
}

export async function fetchStockValue() {
  try {
    const promiseArray = stocks.map((stock) => getNifty50Value(stock));
    const data = await Promise.allSettled(promiseArray);
    let i = 0;
    const updatedData = data
      .filter((d) => d.status === "fulfilled")
      .map((d) => {
        const value = d.value as string[];
        return {
          stock: stocks[i++],
          value: value[0],
          change: value[1],
          percentage: value[2],
        };
      });
    return updatedData;
  } catch (error) {
    console.log("Error fetching stock value:", error);
  }
}

export const SSE = async (_: Request, res: Response) => {
  if (CacheStock.has("stock")) {
    const cachedData = CacheStock.get("stock");
    res.json({ data: cachedData });
  } else {
    res.status(404).json({ data: "Stock data not found" });
  }
};

export async function loginFunc(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });

    if (!user) {
      res.status(200).json({ error: "User not found" });
      return;
    }

    if (!user.password) {
      res.status(200).json({ error: "plz login with your google account" });
      return;
    }
    // Compare passwords
    const isPasswordValid = await Bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(200).json({ error: "Invalid credentials" });
      return;
    }

    Cookiehelper(res, user);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

export async function signupFunc(req: Request, res: Response) {
  try {
    const { name, username, password } = req.body;

    // check if user is already exists
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await Bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        email: username,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "User registration failed" });
  }
}

export async function loginCheckFunc(req: Request, res: Response) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      res.json({ loggedIn: false });
      return;
    }
    const user = jwt.verify(accessToken, process.env.TOKEN_SECRET!);

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false }).status(401);
  }
}

export async function logoutfunc(req: Request, res: Response) {
  try {
    res
      .clearCookie("accessToken", {
        ...accessTokenCookieOptions,
        maxAge: 0,
      })

      .json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function createArticle(req: Request, res: Response) {
  const { sections, title, image, tags, stock } = req.body as idata;
  try {
    const slug = title.split(" ").join("-");
    const author = req.myProp as string;
    const Stock = stock.split(",");
    const resp = await prisma.article.create({
      data: {
        slug,
        title,
        authorId: author,
        sections: {
          create: [...sections],
        },
        image,
        tags,
        stock: Stock,
      },
    });

    res.json({ message: "success", resp });
  } catch (error) {
    res.json({ message: "some error happend", error });
  }
}

export async function fetchAllPostsSlug(req: Request, res: Response) {
  try {
    const data = await prisma.article.findMany({
      where: {
        authorId: req.myProp,
      },
      select: {
        slug: true,
        id: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(data);
  } catch (error) {
    res.json({ message: "some error happend", error });
  }
}

export async function fetchPostBySlug(req: Request, res: Response) {
  const id = req.query.id as string;

  try {
    const data = await prisma.article.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        sections: true,
        image: true,
      },
    });

    res.json(data);
  } catch (error) {
    res.json({ message: "some error happend", error });
  }
}

export async function deletepost(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const reply = await prisma.article.delete({
      where: {
        id,
      },
    });

    res.json({ success: "true", reply });
  } catch (error) {
    res.json({ message: "some error happend", error });
  }
}

export async function updatepost(req: Request, res: Response) {
  const { postId, data } = req.body as reqdata;

  try {
    const reply = await prisma.$transaction(
      data.map((section) =>
        prisma.section.update({
          where: {
            id: section.id,
            articleId: postId,
          },
          data: {
            content: section.content,
            subtitle: section.subtitle,
          },
        })
      )
    );

    res.json({ success: "true", reply });
  } catch (error) {
    res.json({ message: "some error happend", error });
  }
}

export async function accessTokenVerify(req: Request, res: Response) {
  const { token } = req.body;

  try {
    // Use access token to fetch user info
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
    );

    const user: igoogleData = response.data; // Contains user info

    const dbUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    // Handle user creation if not found
    let savedUser = dbUser;
    if (!savedUser) {
      savedUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    }

    // Call the Cookie helper function
    Cookiehelper(res, savedUser);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

export async function fetchPostByQuery(req: Request, res: Response) {
  const query = req.query.tags as Tags;

  const data = await prisma.article.findMany({
    where: {
      tags: {
        equals: query,
      },
    },
    select: {
      image: true,
      slug: true,
      title: true,
      date: true,
    },
  });

  res.json(data);
}
