"use client";
import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Dropdown from "../menu-dropdown";

const UserMenuDropdown = () => {
  return (
    <Dropdown
      trigger={<FaUser className="text-white text-2xl cursor-pointer mx-2" />}
      className="w-48"
    >
      <Link
        href="/tickets/new"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Sell Ticket
      </Link>
      <Link
        href="/orders"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        My Orders
      </Link>
      <Link
        href="/auth/signout"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Sign Out
      </Link>
    </Dropdown>
  );
};

export default UserMenuDropdown;
