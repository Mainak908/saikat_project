"use client";
import { useEffect, useState } from "react";
import { fetcher2 } from "../_helpers/helperFunc";

interface istockdata {
  stock: string;
  value: string;
  change: string;
  percentage: string;
}
const StockNavbar = () => {
  const [Stock, setStock] = useState<istockdata[]>([]);

  useEffect(() => {
    fetcher2("/sse", "GET").then((result) => setStock(result.data));
  }, []);

  useEffect(() => {
    const intv = setInterval(async () => {
      fetcher2("/sse", "GET").then((result) => setStock(result.data));
    }, 15 * 60 * 1000);

    return () => clearInterval(intv);
  }, []);

  return (
    <div className="relative bg-gray-900 text-white pt-[84px]">
      {/* Ticker Section */}
      <div className="overflow-hidden bg-gray-800 py-3 shadow-lg border-b border-gray-700">
        <div className="flex animate-scroll text-lg whitespace-nowrap items-center">
          {Stock.map(({ stock, value, change, percentage }, index) => (
            <div
              key={index}
              className="flex items-center mx-8 space-x-4 font-medium cursor-pointer hover:text-yellow-400 transition duration-200"
            >
              <span className="text-yellow-400 text-lg">{stock}</span>
              <span className="text-green-400 text-sm">{value}</span>
              <span
                className={`text-sm font-semibold ${
                  change.startsWith("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                {change}
              </span>
              <span
                className={`text-sm font-semibold ${
                  percentage.startsWith("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                ({percentage})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockNavbar;
