import { articles } from "@/data";
import Image from "next/image";
import Link from "next/link";

const RecentNews = () => {
  return (
    <div className="w-[340px] mt-2">
      <h3 className="text-lg font-bold mb-4">Recent News</h3>
      <ul className="space-y-2">
        {articles.map((item, index) => (
          <Link className="flex gap-2" key={index} href={""}>
            <Image
              src={item.image}
              width={60}
              height={60}
              alt=""
              className="w-16 h-16 mt-2"
            />
            <li className="text-wrap text-lg font-medium cursor-pointer text-gray-500 hover:text-blue-500">
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RecentNews;
