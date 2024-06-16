"use client";
import React from "react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import logo from "../../../public/logo.webp";

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center bg-transparent z-50">
      <div className="w-4/5 max-w-5xxl flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src={logo} alt="GitTix Logo" width={100} height={100} />
          </Link>
          <Link href="/" className="text-white font-bold hidden sm:block">
            Home
          </Link>
          <Link
            href="/tickets"
            className="text-white font-bold hidden sm:block"
          >
            Tickets
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link
                href="/tickets/new"
                className="text-white font-bold hidden sm:block"
              >
                Sell Ticket
              </Link>
              <Link
                href="/orders"
                className="text-white font-bold hidden sm:block"
              >
                My Orders
              </Link>
              <Link href="/auth/signout" className="text-white font-bold">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signup" className="text-white font-bold">
                Sign Up
              </Link>
              <Link href="/auth/signin" className="text-white font-bold">
                Sign In
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
