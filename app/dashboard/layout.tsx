"use client";
import SidePanel from "@/components/Dashboard/SidePanel";
import { AccountTypeProvider } from "@/context/account/typeContext";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Fab = dynamic(() => import("@/components/ActionButton"), { ssr: false });

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      router.push("/");
      return;
    }
  }, [router]);
  return (
    <AccountTypeProvider>
      <div className="flex w-full h-screen">
        <Fab />
        <SidePanel />
        {children}
      </div>
    </AccountTypeProvider>
  );
}
