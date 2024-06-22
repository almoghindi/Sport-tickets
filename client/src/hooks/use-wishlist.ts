"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlist-slice";
import { Ticket } from "@/types/ticket";

export const useWishlist = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const addToWishlistHandler = (ticket: Ticket) => {
    dispatch(addToWishlist(ticket));
  };

  const removeFromWishlistHandler = (ticketId: string) => {
    dispatch(removeFromWishlist(ticketId));
  };

  return {
    wishlist,
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
  };
};
