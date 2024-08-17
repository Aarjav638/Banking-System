const CustomCard = () => {
  return (
    <div className="flex flex-col w-full md:w-1/2 lg:w-[65%] h-full bg-slate-500 rounded-lg p-4 mb-4 shadow-md shadow-gray-700 z-10 overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-bold text-center">
        Account Details
      </h2>

      <div className="flex flex-col mt-4 gap-3 ">
        <p className="text-md sm:text-lg font-bold">Name: {"Aarjav Jain"}</p>
        <p className="text-md sm:text-lg font-bold text overflow-ellipsis">
          Email: {"anshjain638@gmail.com"}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Phone Number: {"1234567890"}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Account Number: {"1234567890"}
        </p>
        <p className="text-md sm:text-lg font-bold">Balance:{"10000"}</p>
      </div>
    </div>
  );
};
export default CustomCard;
