import LatestRead from "./_components/bodycomponent";
import Navbar from "./_components/navbar";
import StockNavbar from "./_components/stockbar";

const Page = () => {
  return (
    <>
      <Navbar />
      <StockNavbar />
      <LatestRead />
    </>
  );
};

export default Page;
