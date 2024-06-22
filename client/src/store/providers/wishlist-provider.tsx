"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { setWishlist } from "../slices/wishlist-slice";

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <InitializeWishlist />
      {children}
    </Provider>
  );
};

const InitializeWishlist: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    dispatch(setWishlist(wishlist));
  }, [dispatch]);

  return null;
};
