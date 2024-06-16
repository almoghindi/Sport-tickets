"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { User } from "@/types/user";

interface UserContextType {
  currentUser: User["currentUser"];
  setCurrentUser: (user: User["currentUser"]) => void;
}

const defaultContextValue: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{
  children: ReactNode;
  initialUser: User["currentUser"];
}> = ({ children, initialUser }) => {
  const [currentUser, setCurrentUser] =
    useState<User["currentUser"]>(initialUser);


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
