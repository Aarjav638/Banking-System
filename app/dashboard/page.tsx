"use client";
import { useAxios } from "@/context/axiosContext";
import MiniStatement from "@/components/Dashboard/MiniStatement";
import { useAccountType } from "@/context/account/typeContext";
import BarChart from "@/components/Dashboard/AnalyticsCard";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";
import { useEffect, useState } from "react";
import PieChart from "@/components/Dashboard/PieChar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [savingsAccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [currentAccountNumber, setCurrentAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statement, setStatement] = useState<any>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<any>([]);
  const [monthlySpent, setMonthlySpent] = useState<any>([]);
  const { token, axiosInstance, isTokenReady } = useAxios();
  const { accountType, setAccountType } = useAccountType();
  const router = useRouter();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("account/getdetails");
        setAccount(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    if (isTokenReady && token) {
      fetchUserDetails();
    } else if (isTokenReady) {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [isTokenReady, token]);

  useEffect(() => {
    if (account) {
      try {
        setSavingsAccountNumber(
          decryptAccountNumberDeterministic(account[0]?.accountNumber)
        );
        setCurrentAccountNumber(
          decryptAccountNumberDeterministic(account[1]?.accountNumber)
        );
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    }
  }, [account]);

  useEffect(() => {
    const getStatement = async (accountNumber: string) => {
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "/transactions/getstatement",
          {
            accountnumber: accountNumber,
          }
        );
        setStatement(response.data.Transactions);
        setMonthlySpent(response.data.monthlySpent);
        setMonthlyIncome(response.data.monthlyIncome);
      } catch (error) {
        console.error(
          "An error occurred during the fetching Statement:",
          error
        );
        setError(
          (error as any)?.response?.data?.error || "Failed to fetch statement."
        );
      } finally {
        setLoading(false);
      }
    };

    if (accountType === "savings" && savingsAccountNumber) {
      getStatement(savingsAccountNumber);
    } else if (accountType === "current" && currentAccountNumber) {
      getStatement(currentAccountNumber);
    }
  }, [accountType, savingsAccountNumber, currentAccountNumber]);

  const handleToggle = () => {
    setAccountType(accountType === "savings" ? "current" : "savings");
  };

  const handleOpenNewAccount = () => {
    router.push("/dashboard/openaccount");
  };

  const renderNoAccountMessage = (accountType: string) => (
    <div className="flex flex-col items-center">
      <p className="text-white mb-4">No {accountType} account found.</p>
      <button
        onClick={handleOpenNewAccount}
        className={`${
          accountType === "savings" ? "bg-green-500" : "bg-blue-500"
        } text-white py-2 px-4 rounded`}
      >
        Open a New {accountType.charAt(0).toUpperCase() + accountType.slice(1)}{" "}
        Account
      </button>
    </div>
  );

  // Render the dashboard or alternative view based on account availability
  return (
    <div className="flex flex-col w-full h-full bg-slate-200">
      <h1 className="my-4 text-2xl sm:text-4xl text-center">Dashboard</h1>

      <div className="h-screen bg-black flex flex-col overflow-auto items-center p-4 mx-1">
        {accountType === "savings" && !savingsAccountNumber ? (
          renderNoAccountMessage("savings")
        ) : accountType === "current" && !currentAccountNumber ? (
          renderNoAccountMessage("current")
        ) : (
          <>
            <div className="w-[80%] flex flex-col items-center justify-center h-full">
              <div className="flex md:hidden flex-col items-center justify-center w-full ">
                <label className="text-white mb-2">Account Type: </label>
                <div
                  className={`relative w-24 h-8 items-center flex select-none transition duration-200 ease-in-out rounded-full cursor-pointer ${
                    accountType === "current" ? "bg-blue-500" : "bg-green-500"
                  }`}
                  onClick={handleToggle}
                >
                  {accountType === "current" && (
                    <span className="absolute left-2 text-white text-sm">
                      Savings
                    </span>
                  )}
                  {accountType === "savings" && (
                    <span className="absolute right-2 text-white text-sm">
                      Current
                    </span>
                  )}
                  <span
                    className={`absolute top-1/2 transform -translate-y-1/2 left-1 flex items-center justify-center w-6 h-6 bg-white transition-transform duration-300 ease-in-out rounded-full shadow-md ${
                      accountType === "current"
                        ? "translate-x-16 bg-blue-700"
                        : "translate-x-0 bg-green-700"
                    }`}
                  ></span>
                </div>
                <div className="w-full mt-6">
                  <PieChart
                    monthlyIncome={monthlyIncome}
                    monthlySpent={monthlySpent}
                  />
                </div>
              </div>
              <div className="w-full min-h-[4/5] mt-6 hidden md:flex flex-col items-center justify-center">
                <BarChart
                  monthlyIncome={monthlyIncome}
                  monthlySpent={monthlySpent}
                  months={months}
                />
              </div>
            </div>
            <div className="w-full items-center flex flex-col gap-2 my-4 pb-4">
              <div className="mb-4">
                <MiniStatement
                  type={accountType}
                  statement={statement}
                  loading={loading}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
