import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Order as OrderType } from "@/types/order";
import Link from "next/link";

const Order = ({ order }: { order: OrderType }) => {
  return (
    <tr key={order.id} className="border-b border-gray-600">
      <td className="py-2 px-4">{order.id}</td>
      <td className="py-2 px-4">{order.ticket.title}</td>
      <td className="py-2 px-4">${order.ticket.price}</td>
      <td className="py-2 px-4">
        {order.status === "complete" ? (
          <FaCheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <FaTimesCircle className="h-5 w-5 text-red-500" />
        )}
      </td>
      <td className="py-2 px-4">
        {order.status === "complete" ? (
          <Link href={`/orders/${order.id}`} className="text-blue-500">
            View Ticket
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default Order;
