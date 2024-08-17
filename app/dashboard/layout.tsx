"use client";
import SidePanel from "@/components/Dashboard/SidePanel";
import Fab from "@/components/ActionButton";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screeen">
      <Fab />
      <SidePanel />
      {children}
    </div>
  );
}
