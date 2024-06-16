"use server";
import { User } from "@/types/user";
import { buildClient } from "./build-client";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const client = await buildClient();
    if (!client) return { currentUser: null };
    const { data } = await client.get<User>("/api/users/currentuser");
    return { currentUser: data.currentUser || null };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { currentUser: null };
  }
};
