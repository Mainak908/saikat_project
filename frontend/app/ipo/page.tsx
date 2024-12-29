const IPOSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Text Content */}
        <div className="p-8">
          <h1 className="text-6xl font-bold mb-4">
            Latest IPOS Details and Reviews
          </h1>
          <p className="text-gray-600 mb-4 font-semibold text-base">
            Here, you can find the details of all the Upcoming IPOs and recently
            closed IPOs. Look into the company details, IPO objectives, IPO
            dates, IPO offered price & more before you make your decision of
            whether to apply in that IPO or NOT.
          </p>
        </div>

        {/* Image Section */}
        <div className="bg-blue-100 flex items-center justify-center">
          <img
            src="/ipo.jpg"
            alt="IPO Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default IPOSection;
