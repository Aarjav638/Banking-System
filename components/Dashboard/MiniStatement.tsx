"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";

interface FundTransferSavingsProps {
  token: string;
  type: string;
}

const MiniStatement: React.FC<FundTransferSavingsProps> = ({ token, type }) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [savingsaccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [currentaccountNumber, setCurrentAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statement, setStatement] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const fetchAccount = async () => {
        try {
          const response = await axios.get("/api/account/getdetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAccount(response.data);
        } catch (err) {
          console.error("Failed to fetch account details:", err);
          setError("Failed to fetch account details. Please try again.");
        }
      };

      fetchAccount();
    }
  }, [token]);

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
    if (type) {
      getStatement();
    }
  }, [type]);

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
      const response = await axios.post(
        "/api/transactions/getstatement",
        { accountnumber: accountNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setStatement(response.data);
    } catch (error) {
      setLoading(false);
      console.error("An error occurred during the fetching Statement:", error);
      setError((error as any)?.response?.data?.error);
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

  if (statement) {
    return (
      <div className="flex flex-col w-full h-full p-4">
        <h2 className="text-lg sm:text-xl font-bold text-center text-slate-700">
          Mini Statement
        </h2>
        <p className="text-teal-300 text-center">Your Past 10 Transactions</p>
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
  } else if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
};

export default MiniStatement;
