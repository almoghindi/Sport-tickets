"use client";
import React from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Dropdown from "../menu-dropdown";
import { Ticket } from "@/types/ticket";
import { useRouter } from "next/navigation";

interface WishlistDropdownProps {
  wishlist: Ticket[];
  handleRemove: (ticketId: string) => void;
}

const WishlistDropdown: React.FC<WishlistDropdownProps> = ({
  wishlist,
  handleRemove,
}) => {
  const router = useRouter();
  return (
    <Dropdown
      trigger={<FaHeart className="text-white text-2xl cursor-pointer mx-2" />}
      className="w-60"
    >
      {wishlist.length > 0 ? (
        wishlist.map((ticket) => (
          <div key={ticket.id} className="p-3 border-b">
            <Link href={`/tickets/${ticket.id}`}>
              <div className="flex items-center">
                <Image
                  src={`/${ticket.sport}.webp`}
                  alt={ticket.title}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <div className="ml-2">
                  <p className="text-sm font-bold">{ticket.title}</p>
                  <p className="text-sm text-gray-500">${ticket.price}</p>
                </div>
              </div>
            </Link>
            <div className="flex justify-between mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => router.push(`/tickets/${ticket.id}`)}
              >
                Buy Now
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => handleRemove(ticket.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items in wishlist</p>
      )}
    </Dropdown>
  );
};

export default WishlistDropdown;
