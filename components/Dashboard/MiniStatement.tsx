import React, { useState, useEffect } from "react";

const MiniStatement = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 350);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const miniStatement = [
    {
      date: "12/12/2021",
      amount: 10000,
      type: "debit",
      mode: "upi",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "Debit",
      mode: "UPI",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "Debit",
      mode: "UPI",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "Debit",
      mode: "UPI",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "Debit",
      mode: "UPI",
    },
    {
      date: "12/12/2021",
      amount: 50000,
      type: "Debit",
      mode: "UPI",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-4">
      <h2 className="text-lg sm:text-xl font-bold text-center text-slate-200">
        Mini Statement
      </h2>
      <p className="text-teal-300 text-center"> Past 10 Transactions </p>
      <div className="flex flex-col justify-center items-center bg-blue-400 w-full">
        <table className="table-fixed divide-y w-full divide-gray-200 dark:divide-gray-700 ">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase">
              <td className="text-md sm:text-lg font-bold  overflow-x-auto ">
                Date
              </td>
              <td className="text-md sm:text-lg font-bold  overflow-x-clip">
                {isSmallScreen ? "Amt" : "Amount"}
              </td>
              <td className="text-md sm:text-lg font-bold  overflow-x-auto">
                Type
              </td>
              <td className="text-md sm:text-lg font-bold  overflow-x-auto hidden sm:flex">
                Mode
              </td>
            </tr>
          </thead>
          <tbody>
            {miniStatement.slice(0, 10).map((transaction, index) => (
              <tr
                key={index}
                className="odd:bg-neutral-900 even:bg-neutral-700 text-center items-center justify-center text-gray-200"
              >
                <td className="text-md sm:text-lg font-bold overflow-x-auto">
                  {/* only slice when size of dive is sm */}

                  {isSmallScreen
                    ? transaction.date.slice(0, 5)
                    : transaction.date}
                </td>
                <td className="text-md sm:text-lg font-bold">
                  {transaction.amount}
                </td>
                <td className="text-md sm:text-lg font-bold">
                  {transaction.type}
                </td>
                <td className="text-md sm:text-lg font-bold hidden sm:flex">
                  {transaction.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiniStatement;
