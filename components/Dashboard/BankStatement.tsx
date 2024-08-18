"use client";
import React, { useState, useEffect } from "react";
import { useAxios } from "@/context/axiosContext";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";

interface FundTransferSavingsProps {
  token: string;
  type: string;
}

const BankStatement: React.FC<FundTransferSavingsProps> = ({ type }) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [savingsaccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [currentaccountNumber, setCurrentAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statement, setStatement] = useState<any>(null);
  const { axiosInstance, token } = useAxios();
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    if (token) {
      const fetchAccount = async () => {
        try {
          const response = await axiosInstance.get("/account/getdetails");
          setAccount(response.data);
        } catch (err) {
          console.error("Failed to fetch account details:", err);
          setError("Failed to fetch account details. Please try again.");
        }
      };

      fetchAccount();
    } else {
      setError("Token not found");
    }
  }, [token, axiosInstance]);
  useEffect(() => {
    if (account) {
      try {
        const decryptedSavingAccountNumber = decryptAccountNumberDeterministic(
          account[0].accountNumber
        );
        const decryptedCurrentAccountNumber = decryptAccountNumberDeterministic(
          account[1].accountNumber
        );
        setCurrentAccountNumber(decryptedCurrentAccountNumber);
        setSavingsAccountNumber(decryptedSavingAccountNumber);
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    }
  }, [account]);

  useEffect(() => {
    if (type && (savingsaccountNumber || currentaccountNumber)) {
      getStatement();
    }
  }, [type, savingsaccountNumber, currentaccountNumber]);

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

  const getBankStatement = async (accountNumber: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/transactions/getstatement", {
        accountnumber: accountNumber,
      });
      setStatement(response.data.Transactions);
    } catch (error) {
      console.error("An error occurred during the fetching Statement:", error);
      setError(
        (error as any)?.response?.data?.error || "Failed to fetch statement."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatement = async () => {
    if (type === "savings") {
      await getBankStatement(savingsaccountNumber);
    } else {
      await getBankStatement(currentaccountNumber);
    }
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = statement?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil((statement?.length || 0) / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (statement) {
    return (
      <div className="flex flex-col w-full h-full p-4">
        <h2 className="text-lg sm:text-xl font-bold text-center text-slate-700">
          Bank Statement
        </h2>
        <p className="text-teal-700 text-center">Your Transactions</p>
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
              {currentTransactions?.map((transaction: any, index: number) => (
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
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
};

export default BankStatement;
