"use server";
import { buildClient } from "../api/build-client";
import { Ticket } from "@/types/ticket";

export const getTickets = async (): Promise<Ticket[] | null> => {
  try {
    const client = await buildClient();
    if (!client) return null;

    const { data } = await client.get<Ticket[]>("/api/tickets");
    return data || null;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return null;
  }
};
