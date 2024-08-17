import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decryptAccountNumberDeterministic } from "@/helpers/Account/accountGenerate";

interface FundTransferSavingsProps {
  token: string;
}

const FundTransferSavings: React.FC<FundTransferSavingsProps> = ({ token }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number>();
  const [mode, setMode] = useState("IMPS");
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [savingsaccountNumber, setSavingsAccountNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const fetchAccount = async () => {
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

      fetchAccount();
    }
  }, [token]);

  useEffect(() => {
    if (account && account[0].accountNumber) {
      try {
        const decryptedSavingAccountNumber = decryptAccountNumberDeterministic(
          account[0].accountNumber
        );

        setSavingsAccountNumber(decryptedSavingAccountNumber);
      } catch (error) {
        console.error("Failed to decrypt account number:", error);
        setError("Failed to decrypt account number.");
      }
    }
  }, [account]);

  const handleSubmitFromSaving = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("submitting");
      const response = await axios.post(
        "/api/transactions/transfer",
        {
          senderAccountNumber: savingsaccountNumber,
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
      if (response.status === 200) {
        console.log("Transfer successful");
        alert("Transfer successful");
        setError(null);
        setRecipient("");
        setAmount(undefined);
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "An error occurred during the transfer:",
        (error as any)?.response?.data?.error
      );
      setError(`An error occurred. ${(error as any)?.response?.data?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitFromSaving}
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Fund Transfer From Savings Account
      </h2>
      <label className="block text-sm font-medium mb-2">Sender Account:</label>
      <select
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        defaultValue={savingsaccountNumber}
      >
        {account && savingsaccountNumber && (
          <option>{savingsaccountNumber}</option>
        )}
      </select>

      <label className="block text-sm font-medium mb-2">
        Recipient Account:
      </label>
      <input
        type="text"
        value={recipient}
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
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
      <label className="block text-sm font-medium mb-2">Transfer Mode:</label>
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
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {loading ? "Transferring..." : "Transfer"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default FundTransferSavings;
