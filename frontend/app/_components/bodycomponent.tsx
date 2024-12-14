import { Button } from "@/components/ui/button";
import { articles } from "@/data";
import Image from "next/image";
import Link from "next/link";

const LatestRead = () => {
  return (
    <div className="bg-gray-100 lg:pt-24 pt-[60px]">
      <div className="w-[90%] lg:w-[66%] mx-auto lg:px-4 px-1">
        <div className="lg:flex gap-3">
          <div>
            <h1 className="lg:text-4xl text-xl font-bold mb-3 text-gray-600">
              Latest Read
            </h1>
            <div className="lg:border-b-4 border-b-2 border-black lg:w-[650px] w-[95%]"></div>
          </div>

          <Button className="py-5 px-7 mt-2">Browse All Latest</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 mt-6">
          {articles.map((article, index) => (
            <Link
              href={`/blog/${article.slug}`}
              key={index}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <Image
                src={article.image}
                alt={article.title}
                className="object-fill"
                height={240}
                width={396}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="font-semibold text-green-500 mb-1">
                  {article.date} | {article.category}
                </p>
                <p className="text-sm text-gray-700">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestRead;
