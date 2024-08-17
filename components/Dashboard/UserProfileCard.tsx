import { useState } from "react";

const UserProfileCard = () => {
  const [toogle, setToogle] = useState(false);
  return (
    <div className="flex flex-col w-full md:w-2/5 lg:w-[30%] h-full bg-slate-500 rounded-lg p-4 mb-4 shadow-md shadow-gray-700 z-10 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold">Account Details</h2>
        <button
          className="text-sm text-teal-300 font-bold"
          onClick={() => setToogle(!toogle)}
        >
          {toogle ? "show" : "hide"}
        </button>
      </div>
      <div className="flex flex-col mt-4 gap-3 ">
        <p className="text-md sm:text-lg font-bold">
          Name: {toogle ? "*************" : "Aarjav Jain"}
        </p>
        <p className="text-md sm:text-lg font-bold text overflow-ellipsis">
          Email: {toogle ? "*************" : "anshjain638@gmail.com"}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Phone Number: {toogle ? "*************" : "1234567890"}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Account Number: {toogle ? "*********" : "1234567890"}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Balance:{toogle ? "*********" : "10000"}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
