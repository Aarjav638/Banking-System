import SidePanel from "@/components/Dashboard/SidePanel";
import dynamic from "next/dynamic";
const Fab = dynamic(() => import("@/components/ActionButton"), { ssr: false });
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Fab />
      <SidePanel />
      {children}
    </div>
  );
}
