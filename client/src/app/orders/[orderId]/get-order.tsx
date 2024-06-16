"use server";
import { buildClient } from "../../api/build-client";
import { Order } from "@/types/order";
export const getOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const client = await buildClient();
    if (!client) return null;

    const { data } = await client.get<Order>(`/api/orders/${orderId}`);
    return data || null;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return null;
  }
};
