import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";

interface FundTransferCurrentProps {
  token: string | null;
}

const FundTransferCurrent: React.FC<FundTransferCurrentProps> = ({ token }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("IMPS");
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any[]>([]); // Array to handle multiple accounts
  const [currentAccountNumber, setCurrentAccountNumber] = useState<string>("");

  useEffect(() => {
    if (token) {
      const fetchAccounts = async () => {
        try {
          const response = await axios.get("/api/account/getdetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAccount(response.data);
        } catch (err) {
          console.error("Failed to fetch account details:", err);
          setError("Failed to fetch account details. Please try again.");
        }
      };

      fetchAccounts();
    }
  }, [token]);

  useEffect(() => {
    if (account && account.length == 2 && account[1].accountNumber) {
      try {
        const decryptedCurrentAccountNumber = decryptAccountNumberDeterministic(
          account[1].accountNumber
        );
        setCurrentAccountNumber(decryptedCurrentAccountNumber);
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    } else if (account && account.length == 1) {
      setError("No current account available for transfer.");
    }
  }, [account]);
  const handleSubmitFromSaving = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAccountNumber) {
      setError("No current account available for transfer.");
      return;
    }

    try {
      console.log("submitting");
      const response = await axios.post(
        "/api/transactions/transfer",
        {
          senderAccountNumber: currentAccountNumber,
          recipientAccountNumber: recipient,
          amount,
          mode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Transfer successful:", response.data);
    } catch (error) {
      console.error(
        "An error occurred during the transfer:",
        (error as any)?.response?.data?.error
      );
      setError(`An error occurred. ${(error as any)?.response?.data?.error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmitFromSaving}
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Fund Transfer From Current Account
      </h2>
      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <>
          <label className="block text-sm font-medium mb-2">
            Sender Account:
          </label>
          <select
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
            value={currentAccountNumber}
            disabled={!currentAccountNumber}
          >
            {currentAccountNumber && (
              <option value={currentAccountNumber}>
                {currentAccountNumber}
              </option>
            )}
          </select>

          <label className="block text-sm font-medium mb-2">
            Recipient Account:
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Account Number"
            minLength={10}
            maxLength={10}
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
            required
            onInvalid={(e) => {
              if (e.currentTarget.value.length !== 10) {
                e.currentTarget.setCustomValidity(
                  "Recipient Account Number should be exactly 10 characters long"
                );
              } else {
                e.currentTarget.setCustomValidity("");
              }
            }}
          />
          <label className="block text-sm font-medium mb-2">
            Transfer Mode:
          </label>
          <select
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="IMPS">IMPS</option>
            <option value="NEFT">NEFT</option>
            <option value="RTGS">RTGS</option>
            <option value="UPI">UPI</option>
          </select>
          <label className="block text-sm font-medium mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="block w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={!currentAccountNumber}
          >
            Transfer
          </button>
        </>
      )}
    </form>
  );
};

export default FundTransferCurrent;
