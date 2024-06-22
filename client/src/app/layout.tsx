import React from "react";
import "./globals.css";
import Header from "./components/header/header";
import { getCurrentUser } from "./api/get-current-user";
import { UserProvider } from "@/store/providers/user-provider";
import { WishlistProvider } from "@/store/providers/wishlist-provider";
import QueryProvider from "@/utils/query-provider";
const AsyncLayout: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <UserProvider initialUser={currentUser.currentUser}>
            <WishlistProvider>
              <Header />
              {children}
            </WishlistProvider>
          </UserProvider>
        </QueryProvider>
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
