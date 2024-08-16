"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Transaction } from "@/constants/types";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} -{" "}
            {new Date(transaction.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
