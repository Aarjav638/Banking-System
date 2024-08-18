"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import menu from "../public/menu.png";
import SignInModal from "./auth/SignIn";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Close the menu on scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    router.push("/"); // Redirect to the homepage after logout
  };

  return (
    <>
      <header className="flex justify-between gap-2 flex-row bg-teal-500 min-w-full text-white py-4 px-4 md:px-8 items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold cursor-pointer">
            Banking System
          </h1>
        </Link>
        <div className="hidden md:flex w-4/5 lg:w-4/6 justify-center items-center">
          <ul className="flex gap-x-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            {token && (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/dashboard/openaccount">Open Account</Link>
                </li>
              </>
            )}
            <li>
              <Link href="/aboutus">About</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex justify-end">
          {token ? (
            <li className="cursor-pointer list-none" onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li
              className="cursor-pointer list-none"
              onClick={() => setIsLogin(true)}
            >
              Login
            </li>
          )}
        </div>
        <Image
          src={menu}
          alt="Menu"
          className="md:hidden w-6 h-6 lg:w-16 lg:h-16 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </header>
      {isOpen && (
        <div className="w-full bg-teal-500">
          <ul className="flex flex-col px-4 text-white gap-y-2 items-center sm:items-end">
            <li className="md:hidden">
              <Link href="/">Home</Link>
            </li>
            {token && (
              <>
                <li className="md:hidden">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className="md:hidden">
                  <Link href="/dashboard/openaccount">Open Account</Link>
                </li>
              </>
            )}
            <li className="md:hidden">
              <Link href="/aboutus">About</Link>
            </li>
            <li className="md:hidden">
              <Link href="/contactus">Contact Us</Link>
            </li>
            <li
              className="cursor-pointer md:hidden"
              onClick={token ? handleLogout : () => setIsLogin(true)}
            >
              {token ? "Logout" : "Login"}
            </li>
          </ul>
        </div>
      )}
      {isLogin && (
        <SignInModal isOpen={isLogin} handleClose={() => setIsLogin(false)} />
      )}
    </>
  );
};

export default Header;
