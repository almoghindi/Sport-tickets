"use client";

import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { User } from "@/types/user";
import { setCurrentUser } from "../slices/user-slice";

interface UserProviderProps {
  children: ReactNode;
  initialUser: User["currentUser"];
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  initialUser,
}) => {
  return (
    <Provider store={store}>
      <InitializeUser initialUser={initialUser} />
      {children}
    </Provider>
  );
};

const InitializeUser: React.FC<{ initialUser: any }> = ({ initialUser }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialUser) {
      dispatch(setCurrentUser(initialUser));
    }
  }, [initialUser, dispatch]);

  return null;
};
