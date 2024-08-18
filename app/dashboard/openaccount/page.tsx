"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const Page = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [uid, setUid] = useState("");
  const [father_name, setFather_name] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [type, setType] = useState("savings");
  const [amount, setAmount] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      router.push("/");
      return;
    }
    setToken(token);
  }, [router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !name ||
        !phone ||
        !uid ||
        !father_name ||
        !address ||
        !dob ||
        !type ||
        !amount
      ) {
        setError("Please fill all the fields");
        return;
      }
      const res = await axios.post(
        "/api/account/create-account",
        {
          name,
          phone,
          pan,
          uid,
          father_name,
          address,
          dob,
          type,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        alert("Account created successfully");
        router.push("/dashboard");
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setLoading(false);
      setError(
        `Failed to create account. ${(err as any)?.response?.data?.error}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-auto ">
      <h1 className="text-center text-2xl mt-2">Open Account</h1>

      <form
        className="w-4/5 md:w-3/4 sm:w-1/2 mx-auto p-4 bg-white shadow-md rounded-md my-4 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Enter Details to Open Account
        </h2>
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="phone">
          Phone:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="tel"
          id="phone"
          name="phone"
          required
          maxLength={10}
          minLength={10}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="pan">
          Pan:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          id="pan"
          name="pan"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="uid">
          UID:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          id="uid"
          name="uid"
          required
          onChange={(e) => setUid(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="father_name">
          Father Name:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          id="father_name"
          name="father_name"
          required
          onChange={(e) => setFather_name(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="address">
          Address:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          id="address"
          name="address"
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="block text-sm font-medium mb-2" htmlFor="dob">
          DOB:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="date"
          id="dob"
          name="dob"
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-2" htmlFor="type">
          Type:
        </label>
        <select
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          id="type"
          name="type"
          required
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>

        <label className="block text-sm font-medium mb-2" htmlFor="amount">
          Opening Amount:
        </label>
        <input
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          type="number"
          id="amount"
          name="amount"
          required
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loading ? "Opening Account..." : "Open Account"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Page;
