"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import menu from "../public/menu.png";
import SignInModal from "./auth/SignIn";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <header className="flex justify-between flex-row bg-teal-500 min-w-full text-white py-4 px-4 md:px-8 items-center">
        <Link href="/">
          {" "}
          <h1 className="text-xl md:text-2xl font-semibold mr-6 md:ml-6 text-center">
            Banking System
          </h1>
        </Link>
        <div className="w-[25%] hidden md:flex">
          <ul className="flex-row flex gap-x-6 ">
            <li>
              <Link href="/" referrerPolicy="no-referrer">
                Home
              </Link>
            </li>
            {token && (
              <li>
                <Link href="/dashboard" referrerPolicy="no-referrer">
                  DashBoard
                </Link>
              </li>
            )}
            <li>
              <Link href="/aboutus" referrerPolicy="no-referrer">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" referrerPolicy="no-referrer">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-[25%] hidden md:flex justify-end">
          {token ? (
            <li
              className="cursor-pointer list-none"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </li>
          ) : (
            <li
              className="cursor-pointer list-none"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Login
            </li>
          )}
        </div>
        <Image
          src={menu}
          alt="logo"
          className="flex md:hidden w-6 h-6 lg:w-16 lg:h-16"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </header>
      {isOpen && (
        <div className="w-full bg-teal-500">
          <ul className="flex flex-col px-4 text-white gap-y-2 items-center sm:items-end ">
            <li className="flex md:hidden">
              <Link href="/" referrerPolicy="no-referrer">
                Home
              </Link>
            </li>
            <li className="flex md:hidden">
              <Link href="/dashboard" referrerPolicy="no-referrer">
                Dashboard
              </Link>
            </li>

            <li className="flex md:hidden">
              <Link href="/aboutus" referrerPolicy="no-referrer">
                About
              </Link>
            </li>
            <li className="flex md:hidden">
              <Link href="/contactus" referrerPolicy="no-referrer">
                Contact Us
              </Link>
            </li>
            {token ? (
              <li
                className="cursor-pointer flex md:hidden"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Log Out
              </li>
            ) : (
              <li
                className="cursor-pointer flex md:hidden"
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Login
              </li>
            )}
          </ul>
        </div>
      )}
      {isLogin && (
        <SignInModal
          isOpen={isLogin}
          handleClose={() => {
            setIsLogin(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
