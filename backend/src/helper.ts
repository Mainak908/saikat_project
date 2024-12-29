import { Response } from "express";
import jwt from "jsonwebtoken";
import { iuser } from "./client.js";
import { accessTokenCookieOptions } from "./controller/admincontroller.js";

export const Cookiehelper = (res: Response, user: iuser) => {
  const { password: m, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET!, {
    expiresIn: "1h",
  });
  res
    .cookie("accessToken", token, accessTokenCookieOptions)
    .status(200)
    .json({ message: "Login successful", user: userWithoutPassword });
};
