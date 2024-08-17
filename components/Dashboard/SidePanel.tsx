import Link from "next/link";
import Image from "next/image";
const SidePanel = () => {
  return (
    <div className="hidden sm:flex w-[1/6] items-center flex-col min-h-[100vh] p-4 bg-black">
      <div className="flex flex-col mt-4">
        <h2 className="text-teal-400 text-2xl font-semibold underline">
          Our Services
        </h2>
        <ul className="flex flex-col gap-y-2 mt-4 text-lg text-white">
          <li>
            <Link href="/dashboard" referrerPolicy="no-referrer">
              View DashBoard
            </Link>
          </li>
          <li>
            <Link href="/fundtransfer" referrerPolicy="no-referrer">
              Funds Transfer
            </Link>
          </li>
          <li>
            <Link href="/tnxhistory" referrerPolicy="no-referrer">
              View Bank Statement
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profilesettings"
              referrerPolicy="no-referrer"
            >
              Profile Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
