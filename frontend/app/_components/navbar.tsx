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
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import MediaRendering from "../_helpers/media-render";

const Navbar = () => {
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
              {/* Icon */}
              <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-2xl font-bold">N</span>
              </div>

              {/* Text */}
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

            <ul className="flex space-x-6 text-md font-bold text-white">
              <li className="cursor-pointer hover:text-green-200 transition">
                Trending News
              </li>

              <HoverCard>
                <HoverCardTrigger>
                  <div className="relative flex items-center gap-1 cursor-pointer">
                    <li className="hover:text-green-200 transition flex items-center gap-1">
                      Learning
                      <MdOutlineKeyboardArrowDown className="text-lg" />
                    </li>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="absolute top-full  right-0 ml-10 mt-1 bg-white text-gray-800 rounded-sm shadow-md w-32 ">
                  <ul className="">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Options
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Stocks
                    </li>
                  </ul>
                </HoverCardContent>
              </HoverCard>

              <li className="cursor-pointer hover:text-green-200 transition">
                IPO
              </li>
              <li className="cursor-pointer hover:text-green-200 transition">
                Insights
              </li>
            </ul>
          </div>
        </nav>
      </MediaRendering>
    </>
  );
};

export default Navbar;
