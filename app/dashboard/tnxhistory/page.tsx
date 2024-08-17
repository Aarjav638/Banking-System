"use client";
import BankStatement from "@/components/Dashboard/BankStatement";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
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
    <div className="min-h-screen w-full items-center flex flex-col gap-2">
      <h1 className="text-2xl font-bold mt-4 text-center">Bank Statement</h1>
      <form className="flex justify-center items-center flex-col sm:flex-row gap-2 mt-4">
        <label htmlFor="accountType" className="mr-4 sm:text-center">
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
      <BankStatement token={token ? token : ""} type={type ? type : ""} />
    </div>
  );
};
export default Page;
