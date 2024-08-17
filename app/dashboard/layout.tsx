import SidePanel from "@/components/Dashboard/SidePanel";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screeen">
      <SidePanel />
      {children}
    </div>
  );
}
