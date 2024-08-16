"use client";
import SignInModal from "@/components/auth/SignIn";
import SignUpModal from "@/components/auth/SignUp";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
const Home: React.FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const Router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const handleClose = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(false);
  };

  return (
    <div className="flex flex-col min-h-[100vh] w-full items-center justify-center bg-gray-100">
      <main className="flex flex-col w-full h-full ">
        <h1 className=" text-2xl md:text-4xl font-bold text-teal-600 text-center">
          Welcome to the Banking System
        </h1>
        <p className="text-gray-700 mt-4 text-sm md:text-lg text-center">
          Securely manage your transactions and accounts.
        </p>

        <div className="mt-8 flex justify-center items-center space-x-4">
          {token && (
            <>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                onClick={() => {
                  Router.push("/dashboard");
                }}
              >
                Go to Dashboard
              </button>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Log Out
              </button>
            </>
          )}
          {!token && (
            <>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                onClick={() => {
                  setIsSignInOpen(true);
                }}
              >
                Sign In
              </button>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                onClick={() => {
                  setIsSignUpOpen(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {token && (
          <p className="text-2xl font-semibold text-center text-gray-800 mt-10">
            You are logged in. You can now access the dashboard.
          </p>
        )}

        {isSignInOpen && (
          <SignInModal isOpen={isSignInOpen} handleClose={handleClose} />
        )}
        {isSignUpOpen && (
          <SignUpModal isOpen={isSignUpOpen} handleClose={handleClose} />
        )}
      </main>
    </div>
  );
};

export default Home;
