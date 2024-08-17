import React from "react";
import Link from "next/link";
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-teal-500 p-2 sm:p-8 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-center text-white font-semibold text-sm">
        © 2024 Random Post Generator. All rights reserved.
      </p>
      <div className="min-w-[50%] justify-center items-center">
        <ul className=" flex flex-row items-center w-full justify-center gap-x-4 text-white">
          <li>
            <Link href="/" referrerPolicy="no-referrer">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" referrerPolicy="no-referrer">
              About
            </Link>
          </li>
          <li>
            <Link href="/contactus" referrerPolicy="no-referrer">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
