"use client";
import React, { useState, useEffect } from "react";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";
import { useAxios } from "@/context/axiosContext";

interface FundTransferSavingsProps {
  type: string;
  statement: any;
  loading: boolean;
}

const MiniStatement: React.FC<FundTransferSavingsProps> = ({
  type,
  statement,
  loading,
}) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (statement) {
    return (
      <div className="flex flex-col w-full h-full p-4">
        <h2 className="text-lg sm:text-xl font-bold text-center text-slate-700">
          Mini Statement
        </h2>
        <p className="text-teal-300 text-center">
          Your Past 10 Transactions({type} account)
        </p>
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
              {statement
                ?.slice(0, 10)
                .map((transaction: any, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-neutral-900 even:bg-neutral-700 text-center items-center justify-center text-gray-200"
                  >
                    <td className="text-md sm:text-lg font-bold overflow-x-auto">
                      {isSmallScreen
                        ? new Date(transaction.createdAt)
                            .toLocaleDateString()
                            .slice(0, 5)
                        : new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-md sm:text-lg font-bold">
                      {transaction.amount}
                    </td>
                    <td className="text-md sm:text-lg font-bold">
                      {transaction.transactionType.charAt(0).toUpperCase() +
                        transaction.transactionType.slice(1)}
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
  }

  return null;
};

export default MiniStatement;
