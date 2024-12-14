import Navbar from "@/app/_components/navbar";
import RecentNews from "@/app/_components/Recentnews";
import { articles } from "@/data";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const news = articles.find((value) => value.slug === slug);
  if (!news) return;
  return (
    <>
      <Navbar />
      <div className="max-w-[90%] lg:max-w-[80%] mx-auto px-4 lg:pt-24 pt-[70px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main News Section */}
          <div className="lg:col-span-3 lg:border-r lg:border-gray-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {news.title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              {news.date}
            </p>

            {/* Image */}
            <Image
              src={news.image}
              alt="News"
              className="rounded-md mb-6 w-full object-cover"
              width={1200}
              height={500}
            />

            {/* News Details */}
            <div className="space-y-8">
              {/* Stock Description */}
              <p className="text-gray-500 text-base md:text-lg leading-relaxed font-semibold">
                This stock is a leading Indian hotel chain, known for being the
                largest in the mid-priced segment and the third largest overall
                in the country. The stock has jumped to an intraday high of 2.76
                percent after signing a license agreement for a new hotel in
                Ranchi and opening a resort in Bhutan.
              </p>

              {/* Stock Price Movement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Stock Price Movement:
                </h2>
                <p className="text-gray-600 md:text-lg leading-relaxed font-semibold">
                  With a market capitalization of Rs. 11,546.99 crores, the
                  share of{" "}
                  <span className="font-bold text-black">
                    Lemon Tree Hotels
                  </span>{" "}
                  Limited has reached an intraday high of Rs. 150.65 per equity
                  share, rising nearly around 2.76 percent from its previous
                  day’s close price of Rs. 146.60. Over the last months, Lemon
                  Tree Hotels Limited has given a return of 23.38 percent.
                </p>
              </div>

              {/* What Happened */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  What Happened:
                </h2>
                <p className="text-gray-700 md:text-lg leading-relaxed font-semibold mb-4">
                  Lemon Tree Hotels Limited has signed a license agreement for a
                  new Lemon Tree Hotel in Ranchi, Jharkhand. The hotel is
                  managed by its subsidiary Carnation Hotels and will feature 65
                  rooms and various amenities. It is expected to open in FY
                  2027.
                </p>
                <p className="text-gray-700 md:text-lg leading-relaxed font-semibold">
                  Additionally, the company has also officially opened the Lemon
                  Tree Resort in Thimphu, Bhutan, marking its second property in
                  the region. The resort features 60 rooms, a villa, Citrus
                  Café, and Slounge. Phase I, with 48 rooms and a villa, is
                  open, while Phase II will include additional amenities like a
                  fitness center, pool, and spa.
                </p>
              </div>

              {/* Management Guidance */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Management Guidance:
                </h2>
                <p className="text-gray-500 md:text-lg leading-relaxed font-semibold">
                  Lemon Tree Hotels anticipates an annual EBITDA of Rs. 125
                  crore from renovated properties, expecting 15%–20% revenue
                  growth after stabilization. The company plans to attract new
                  corporate clients and expand its retail business in Aurika
                  Mumbai, aiming for a balanced mix of corporate and retail room
                  bookings.
                </p>
              </div>

              {/* Future Strategy */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Future Strategy:
                </h2>
                <p className="text-gray-500 md:text-lg leading-relaxed mb-4 font-semibold">
                  Lemon Tree Hotels projects a revenue growth of over 15% for Q3
                  and Q4. The company plans to invest Rs. 250–300 crore in
                  renovations through FY26, with expenses stabilizing at
                  1.5%–1.6% of revenue.
                </p>
                <p className="text-gray-500 md:text-lg leading-relaxed font-semibold">
                  Additionally, 19 new management and franchise contracts have
                  been signed, adding 1,373 rooms to the pipeline.
                </p>
              </div>
            </div>
          </div>

          {/* Recent News Section */}
          <div className="col-span-1 lg:px-4 px-0">
            <RecentNews />
          </div>
        </div>
      </div>
    </>
  );
}
