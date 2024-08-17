// components/AccountOverview.tsx
import { useEffect, useState } from "react";

interface Account {
  accountNumber: string;
  balance: number;
}

const AccountOverview: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch("/api/account");
        const data = await response.json();
        if (response.ok) {
          setAccount(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Account Overview</h2>
      {account && (
        <div>
          <p className="mb-2">Account Number: {account.accountNumber}</p>
          <p>Balance: ${account.balance}</p>
        </div>
      )}
    </div>
  );
};

export default AccountOverview;
