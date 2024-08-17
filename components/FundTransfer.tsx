// components/FundTransfer.tsx
import { useState } from "react";

const FundTransfer: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, amount }),
      });
      const result = await response.json();
      if (response.ok) {
        // Handle successful transfer
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-lg font-semibold mb-4">Fund Transfer</h2>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Account Number"
        className="block w-full mb-3 p-2 border border-gray-300 rounded"
        required
      />
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
      >
        Transfer
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default FundTransfer;
