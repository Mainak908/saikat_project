import BodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { OAuth2Client } from "google-auth-library";
import { fetchStockValue } from "./controller/admincontroller.js";
import router from "./router/adminrouter.js";

export const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
export const CacheStock = new Map();

const isMarketOpen = () => {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday

  // Market open Monday to Friday (9 AM to 4 PM)
  const isWeekday = day > 0 && day < 6; // Exclude Saturday (6) and Sunday (0)
  const isTradingHours = hours >= 9 && hours < 16;

  return isWeekday && isTradingHours;
};

setInterval(async () => {
  if (!isMarketOpen()) return;

  const data = await fetchStockValue();
  CacheStock.set("stock", data);
}, 15 * 60 * 1000); // 15 mins

(async () => {
  const data = await fetchStockValue(); // Fetch immediately
  CacheStock.set("stock", data);
})();
const app = express();
const PORT = 3001;

// Middleware
app.use(BodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORSORIGIN,
    credentials: true,
  })
);
app.use(router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
