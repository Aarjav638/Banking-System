"use client";
import { useAxios } from "@/context/axiosContext";
import MiniStatement from "@/components/Dashboard/MiniStatement";
import { useAccountType } from "@/context/account/typeContext";
import BarChart from "@/components/Dashboard/AnalyticsCard";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";
import { useEffect, useState } from "react";
import LineChart from "@/components/Dashboard/LineChart";
export default function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [savingsaccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [currentaccountNumber, setCurrentAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statement, setStatement] = useState<any>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<any>([]);
  const [monthlySpent, setMonthlySpent] = useState<any>([]);
  const { token, axiosInstance, isTokenReady } = useAxios();
  const { accountType } = useAccountType();
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
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("account/getdetails");
      setAccount(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setError("Failed to fetch user details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isTokenReady && token) {
      fetchUserDetails();
    } else if (isTokenReady) {
      setLoading(false);
      setError("No token found. Please log in.");
    }
  }, [isTokenReady, token]);
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
    if (accountType && (savingsaccountNumber || currentaccountNumber)) {
      getStatement();
    }
  }, [accountType, savingsaccountNumber, currentaccountNumber]);

  // Fetch the Analytics
  const getAnalytics = async (accountNumber: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/transactions/getstatement", {
        accountnumber: accountNumber,
      });
      console.log(response.data);
      setStatement(response.data.Transactions);

      setMonthlySpent(response.data.monthlySpent);
      setMonthlyIncome(response.data.monthlyIncome);
    } catch (error) {
      console.error("An error occurred during the fetching Statement:", error);
      setError(
        (error as any)?.response?.data?.error || "Failed to fetch statement."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get the statement
  const getStatement = async () => {
    if (accountType === "savings") {
      await getAnalytics(savingsaccountNumber);
    } else {
      await getAnalytics(currentaccountNumber);
    }
  };
  return (
    <div className="flex flex-col w-full h-full bg-slate-200 ">
      <h1 className="my-4 text-2xl sm:text-4xl text-center">Dashboard</h1>

      <div className="h-screen bg-black flex flex-col overflow-auto p-2 mx-1">
        <div className="w-full flex flex-col  md:flex-row  justify-between min-h-full p-4 gap-4">
          <LineChart
            monthlyIncome={monthlyIncome}
            monthlySpent={monthlySpent}
            months={months}
          />
          <BarChart
            monthlyIncome={monthlyIncome}
            monthlySpent={monthlySpent}
            months={months}
          />
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
      </div>
    </div>
  );
}
