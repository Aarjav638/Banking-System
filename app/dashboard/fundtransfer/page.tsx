"use client";

import FundTransferCurrent from "@/components/FundTransferCurrent";
import FundTransferSavings from "@/components/FundTransferSavings";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [accountType, setAccountType] = useState("savings");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      router.push("/");
      return;
    }
    setToken(token);
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-semibold mb-4 text-center ">
        Fund Transfer
      </h1>
      <h2>
        <label className="block text-xl font-medium mb-2 text-center">
          Select Account Type:
        </label>
        <select
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>
      </h2>
      {accountType === "savings" ? (
        <FundTransferSavings key={"savings"} token={token ?? ""} />
      ) : (
        <FundTransferCurrent key={"current"} token={token ?? ""} />
      )}
    </div>
  );
};

export default Page;
