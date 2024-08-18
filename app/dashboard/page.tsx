"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomCard from "@/components/Dashboard/CustomCard";
import UserProfileCard from "@/components/Dashboard/UserProfileCard";
import MiniStatement from "@/components/Dashboard/MiniStatement";
export default function Dashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();

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
    <div className="flex flex-col w-full h-full bg-slate-200 p-4 ">
      <h1 className="my-4 text-2xl sm:text-4xl text-center">Dashboard</h1>

      <div className="mt-10 h-screen bg-black flex flex-col overflow-auto p-2">
        <div className="justify-center h-1/2 md:justify-between flex flex-col md:flex-row p-4 ">
          <UserProfileCard type={type ? type : ""} token={token ? token : ""} />
          <CustomCard />
        </div>
        <div className="h-1/2 w-full items-center flex flex-col gap-2 my-4 pb-4">
          <form className="flex justify-center items-center flex-col sm:flex-row gap-2 ">
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
          <div className="mb-4">
            <MiniStatement token={token ? token : ""} type={type ? type : ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
