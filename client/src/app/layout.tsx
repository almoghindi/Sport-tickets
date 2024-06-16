import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
// import { UserProvider } from "@/context/user-context";
import { getCurrentUser } from "./api/get-current-user";
import { Provider } from "react-redux";
import store from "@/store/store";
import { UserProvider } from "@/store/providers/user-provider";

const AsyncLayout: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <UserProvider initialUser={currentUser.currentUser}>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
};

// RootLayout component
const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AsyncLayout>
      <main>{children}</main>
    </AsyncLayout>
  );
};

export default RootLayout;
