"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/constants/types";
import CustomCard from "@/components/Dashboard/CustomCard";
import UserProfileCard from "@/components/Dashboard/UserProfileCard";
import MiniStatement from "@/components/Dashboard/MiniStatement";
import Fab from "@/components/ActionButton";
export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "dhjcvabehjdfzbhjfbshjdvfbjkabdhjfbvhj",
      amount: 10000,
      type: "debit",
      mode: "upi",
    },
    {
      id: "vfdjhvbfjhdabvhjbadfjhzbvjhll",
      amount: 50000,
      type: "credit",
      mode: "neft",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, [router]);

  return (
    <div className="flex flex-col w-full h-full bg-slate-200 p-4 ">
      <Fab />
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-2xl sm:text-4xl text-center">Dashboard</h1>
      </div>
      <div className="mt-4 h-screen bg-black flex flex-col overflow-auto p-2">
        <div className="justify-center h-3/4 md:h-1/2   md:justify-between flex flex-col md:flex-row p-4 ">
          <UserProfileCard type={type ? type : ""} token={token ? token : ""} />
          <CustomCard />
        </div>
        <div className="w-full items-center flex flex-col gap-2 my-4 pb-4">
          <form className="flex h-1/5 w-full justify-center items-center flex-col sm:flex-row gap-2 ">
            <label
              htmlFor="accountType"
              className="mr-4 sm:text-center text-white"
            >
              Select Account Type:{" "}
            </label>
            <select
              className=" p-2 rounded-lg "
              onChange={(e) => setType(e.target.value)}
              value={type ? type : ""}
            >
              <option value="">Select Account Type</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </form>
          <div className="mb-6 h-1/2 w-full flex flex-col">
            <MiniStatement token={token ? token : ""} type={type ? type : ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
