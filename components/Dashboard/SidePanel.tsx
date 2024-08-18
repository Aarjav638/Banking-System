import Link from "next/link";
import Image from "next/image";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccountType } from "@/context/account/typeContext"; // Import the context
import { useAxios } from "@/context/axiosContext"; // Import axios context

const SidePanel = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingsAccountNumber, setSavingsAccountNumber] = useState("");
  const [currentAccountNumber, setCurrentAccountNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const { accountType, setAccountType } = useAccountType();
  const { axiosInstance, token, isTokenReady } = useAxios(); // Use axios instance and token from context
  const router = useRouter();

  const handleToggle = () => {
    setAccountType(accountType === "savings" ? "current" : "savings");
  };

  const fetchUserDetails = async () => {
    console.log("Fetching user details...");
    console.log("Token:", token);
    console.log(
      "Axios Instance Headers:",
      axiosInstance.defaults.headers.common
    );

    try {
      const response = await axiosInstance.get("account/getdetails");
      setUserDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setError("Failed to fetch user details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isTokenReady && token) {
      fetchUserDetails();
    } else if (isTokenReady) {
      setLoading(false);
      setError("No token found. Please log in.");
    }
  }, [isTokenReady, token]);

  useEffect(() => {
    if (userDetails) {
      try {
        const decryptedSavingAccountNumber = decryptAccountNumberDeterministic(
          userDetails[0]?.accountNumber
        );
        const decryptedCurrentAccountNumber = decryptAccountNumberDeterministic(
          userDetails[1]?.accountNumber
        );
        setCurrentAccountNumber(decryptedCurrentAccountNumber);
        setSavingsAccountNumber(decryptedSavingAccountNumber);
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    }
  }, [userDetails]);

  // if (loading) {
  //   return <div className="text-white">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  return (
    <div className="hidden sm:flex w-[1/6] items-center flex-col min-h-[100vh] p-4 bg-black">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-white text-2xl font-semibold text-center">
          User Details
        </h1>
        <label className="text-white">Account Type: </label>
        <div
          className={`relative w-24 h-8 items-center flex select-none transition duration-200 ease-in-out rounded-full cursor-pointer ${
            accountType === "current" ? "bg-blue-500" : "bg-green-500"
          }`}
          onClick={handleToggle}
        >
          {accountType === "current" && (
            <span className="absolute left-2 text-white text-sm">Savings</span>
          )}
          {accountType === "savings" && (
            <span className="absolute right-2 text-white text-sm">Current</span>
          )}
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 left-1 flex items-center justify-center w-6 h-6 bg-white transition-transform duration-300 ease-in-out rounded-full shadow-md ${
              accountType === "current"
                ? "translate-x-16 bg-blue-700"
                : "translate-x-0 bg-green-700"
            }`}
          ></span>
        </div>

        <div className="flex flex-col gap-4 mt-4 items-between justify-center">
          <Image
            src="/man.png"
            alt="User"
            width={100}
            height={100}
            className="rounded-full self-center"
          />

          <p className="text-white text-lg">
            Name:{" "}
            {accountType === "savings"
              ? userDetails && userDetails[0]?.name
              : userDetails && userDetails[1]?.name}
          </p>
          <p className="text-white text-lg">
            Account Number:{" "}
            {accountType === "savings"
              ? savingsAccountNumber
              : currentAccountNumber}
          </p>
          <p className="text-white text-lg">
            Phone:{" "}
            {accountType === "savings"
              ? userDetails && userDetails[0]?.phone
              : userDetails && userDetails[1]?.phone}
          </p>

          <p className="text-white text-lg">
            Balance:{" "}
            {accountType === "savings"
              ? userDetails && userDetails[0]?.balance
              : userDetails && userDetails[1]?.balance}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h2 className="text-teal-400 text-2xl font-semibold underline">
          Our Services
        </h2>
        <ul className="flex flex-col gap-y-4 mt-4 text-lg text-white">
          <li>
            <a
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer"
            >
              View DashBoard
            </a>
          </li>
          <li>
            <Link href="/dashboard/openaccount" referrerPolicy="no-referrer">
              Open Account
            </Link>
          </li>
          <li>
            <Link href="/dashboard/fundtransfer" referrerPolicy="no-referrer">
              Funds Transfer
            </Link>
          </li>
          <li>
            <Link href="/dashboard/tnxhistory" referrerPolicy="no-referrer">
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
