import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";
import axios from "axios";
import { use, useEffect, useState } from "react";

const UserProfileCard = ({
  type,
  token,
}: {
  type: string | null;
  token: string;
}) => {
  const [toogle, setToogle] = useState(true);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingsAccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [currentAccountNumber, setCurrentAccountNumber] = useState<string>("");
  useEffect(() => {
    if (token) {
      const fetchAccount = async () => {
        try {
          const response = await axios.get("/api/account/getdetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserDetails(response.data);
        } catch (err) {
          console.error("Failed to fetch account details:", err);
          setError("Failed to fetch account details. Please try again.");
        }
      };

      fetchAccount();
    }
  }, [token]);
  useEffect(() => {
    if (userDetails) {
      try {
        const decryptedSavingAccountNumber = decryptAccountNumberDeterministic(
          userDetails[0].accountNumber
        );
        const decryptedCurrentAccountNumber = decryptAccountNumberDeterministic(
          userDetails[1].accountNumber
        );
        setCurrentAccountNumber(decryptedCurrentAccountNumber);

        setSavingsAccountNumber(decryptedSavingAccountNumber);
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    }
  }, [userDetails]);
  console.log(userDetails);
  if (!userDetails) {
    return (
      <div className="flex flex-col w-full md:w-2/5 lg:w-[30%] h-full bg-slate-500 rounded-lg justify-center items-center p-4 mb-4 shadow-md shadow-gray-700 z-10 overflow-y-auto">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-2/5 lg:w-[30%] h-full bg-slate-500 rounded-lg p-4 mb-4 shadow-md shadow-gray-700 z-10 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold">Account Details</h2>
        <button
          className="text-sm text-teal-300 font-bold"
          onClick={() => setToogle(!toogle)}
        >
          {toogle ? "show" : "hide"}
        </button>
      </div>
      <div className="flex flex-col mt-4 gap-3 ">
        <p className="text-md sm:text-lg font-bold">
          Name:{" "}
          {toogle
            ? "*************"
            : type === "savings"
            ? userDetails[0].name
            : userDetails[1].name}
        </p>

        <p className="text-md sm:text-lg font-bold">
          Phone Number:{" "}
          {toogle
            ? "*************"
            : type === "savings"
            ? userDetails[0].phone
            : userDetails[1].phone}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Account Number:{" "}
          {toogle
            ? "*********"
            : type === "savings"
            ? savingsAccountNumber
            : currentAccountNumber}
        </p>
        <p className="text-md sm:text-lg font-bold">
          Balance:
          {toogle
            ? "*********"
            : type === "savings"
            ? userDetails[0].balance
            : userDetails[1].balance}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
