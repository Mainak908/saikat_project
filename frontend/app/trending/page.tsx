import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "../_components/loading";
import Navbar from "../_components/navbar";
import RecentNews from "../_components/Recentnews";

export const metadata: Metadata = {
  title: "Trending News",
};
interface itype {
  image: string;
  slug: string;
  title: string;
  date: string;
}
const App = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/trendingSender?tags=TRENDING`,
    {
      method: "GET",
    }
  );
  const newz: itype[] = await data.json();

  return (
    <>
      <Navbar />
      {newz.map((news, key) => {
        const date = new Date(news.date);

        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return (
          <div
            className="max-w-[90%] lg:max-w-[80%] mx-auto px-4 lg:pt-24 pt-[90px] mb-6"
            key={key}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main News Section */}
              <div className="lg:col-span-3 lg:border-r lg:border-gray-300">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {news.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {formattedDate}
                </p>

                {/* Image */}
                <Image
                  src={news.image}
                  alt="News"
                  className="rounded-md mb-6 w-full object-cover"
                  width={1200}
                  height={500}
                />
              </div>

              {/* Recent News Section */}
              <div className="col-span-1 lg:px-4 px-0">
                <RecentNews />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
const Page = () => (
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>
);
export default Page;
