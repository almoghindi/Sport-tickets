"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { useWishlist } from "@/hooks/use-wishlist";
import Image from "next/image";
import logo from "../../../../public/logo.webp";
import UserMenuDropdown from "./user-dropdown";
import WishlistDropdown from "./wishlist-dropdown";

const Header = () => {
  const { currentUser } = useUser();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center bg-transparent z-50">
      <div className="w-4/5 max-w-5xxl flex justify-between items-center">
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
              <WishlistDropdown
                wishlist={wishlist}
                handleRemove={removeFromWishlist}
              />
              <UserMenuDropdown />
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
