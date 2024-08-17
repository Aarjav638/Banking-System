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
        <div className="flex items-center justify-center w-full">
          <h1 className="my-4 text-2xl sm:text-4xl ">Dashboard</h1>
        </div>
        <p className="text-teal-300 text-md font-bold flex flex-col mb-4 bg-slate-500 w-4/5 md:w-3/4 lg:w-1/2 rounded-lg text-center p-4">
          Welcome to your dashboard. Here you can see all your Details.
        </p>
      </div>
      <div className="mt-10 h-screen bg-black flex flex-col overflow-auto p-2">
        <div className="justify-center h-1/2 bg-yellow-50  md:justify-between flex flex-col md:flex-row p-4 ">
          <UserProfileCard />
          <CustomCard />
        </div>
        <div className="h-1/2 my-2 flex flex-col mb-10">
          <MiniStatement />
        </div>
      </div>
    </div>
  );
}
