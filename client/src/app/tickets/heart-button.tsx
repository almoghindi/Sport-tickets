"use client";
import React from "react";
import { useWishlist } from "../../hooks/use-wishlist";
import { Ticket } from "@/types/ticket";

interface HeartButtonProps {
  ticket: Ticket;
}

const HeartButton: React.FC<HeartButtonProps> = ({ ticket }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const liked = wishlist.some((item) => item.id === ticket.id);

  const toggleLike = () => {
    if (liked) {
      removeFromWishlist(ticket.id);
    } else {
      addToWishlist(ticket);
    }
  };

  return (
    <div
      className={`absolute top-4 right-4 cursor-pointer ${
        liked ? "text-red-500" : "text-gray-400"
      }`}
      onClick={toggleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default HeartButton;
