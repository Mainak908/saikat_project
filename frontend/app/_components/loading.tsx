const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-solid rounded-full border-transparent border-t-blue-500 animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Spinner;
