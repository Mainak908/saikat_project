"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarItems } from "@/data";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import MediaRendering from "../_helpers/media-render";

const Navbar = () => {
  // const [data, setdata] = useState("");
  const [clicked, setclicked] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (clicked && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [clicked]);

  return (
    <>
      <MediaRendering minWidth={null} maxWidth="600">
        <nav className="h-16 w-screen px-3 py-4 bg-slate-100 flex justify-between fixed items-center">
          <div className="flex items-center justify-center gap-2">
            {/* Icon */}
            <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md">
              <span className="text-2xl font-bold">N</span>
            </div>

            {/* Text */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                <span className="text-green-600">nivesh</span>
                <span className="text-gray-600">Newz</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-500 tracking-wide">
                Stay Invested. Stay Updated.
              </p>
            </div>
          </div>

          <Sheet>
            {/* Trigger Icon */}
            <SheetTrigger>
              <IoReorderThreeOutline className="text-4xl text-gray-700 hover:text-green-600 transition-transform duration-300 hover:scale-110" />
            </SheetTrigger>

            <SheetContent className="w-screen bg-gray-50">
              <SheetHeader className="p-4 space-y-4">
                <SheetTitle className="text-2xl font-bold text-blue-800 border-b pb-2 ">
                  Menu
                </SheetTitle>
              </SheetHeader>
              {NavbarItems.map((data, val) => (
                <div
                  key={val}
                  className="flex-col items-center justify-center gap-1 cursor-pointer text-xl font-semibold text-gray-700 hover:text-green-600 transition
                  py-4 "
                >
                  <p>{data}</p>
                  <div className="mt-2 border-b-[1px] border-gray-400 w-screen"></div>
                </div>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex mt-2 items-center gap-1 cursor-pointer text-xl font-semibold text-gray-700 hover:text-green-600 transition">
                  <p>Learning</p>
                  <MdOutlineKeyboardArrowDown className="text-2xl" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Options</DropdownMenuItem>
                  <DropdownMenuItem>Stocks</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Footer */}
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} News Portal | All rights
                  reserved.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </MediaRendering>
      <MediaRendering minWidth="1024" maxWidth={null}>
        <nav className="bg-[#7cc68d] py-3 fixed w-screen z-50">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-2xl font-bold">N</span>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                  <span className="text-green-600">nivesh</span>
                  <span className="text-gray-600">News</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 tracking-wide">
                  Stay Invested. Stay Updated.
                </p>
              </div>
            </div>
            {!clicked && (
              <ul className="flex items-center space-x-6 text-md font-bold text-white">
                {/* Trending News */}
                <li className="cursor-pointer hover:text-green-200 transition-all duration-300">
                  Trending News
                </li>

                {/* Learning Dropdown */}
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="relative flex items-center gap-1 cursor-pointer">
                      <li className="hover:text-green-200 transition-all duration-300 flex items-center gap-1">
                        Learning
                        <MdOutlineKeyboardArrowDown className="text-lg" />
                      </li>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-md w-40">
                    <ul>
                      <Link
                        href={"/learnings/option"}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                      >
                        Options
                      </Link>
                      <Link
                        href={"/learnings/stock"}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                      >
                        Stocks
                      </Link>
                    </ul>
                  </HoverCardContent>
                </HoverCard>

                {/* IPO */}
                <Link
                  href={"/ipo"}
                  className="cursor-pointer hover:text-green-200 transition-all duration-300"
                >
                  IPO
                </Link>

                {/* Insights */}
                <Link
                  href={"/insights"}
                  className="cursor-pointer hover:text-green-200 transition-all duration-300"
                >
                  Insights
                </Link>

                {/* Search Icon */}
                <IoIosSearch
                  className="text-2xl cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => setclicked(true)}
                />
              </ul>
            )}

            {clicked && (
              <div className="flex items-center space-x-2 animate-fade-in">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search"
                  ref={searchInputRef}
                  className="rounded-2xl px-4 py-1 w-[500px] focus:outline-none border border-gray-300 focus:border-green-200 transition-all duration-600"
                />

                {/* Close Icon */}
                <RxCross1
                  className="relative right-10 text-xl cursor-pointer hover:text-red-500 transition-all duration-600"
                  onClick={() => setclicked(false)}
                />
              </div>
            )}
          </div>
        </nav>
      </MediaRendering>
    </>
  );
};

export default Navbar;
