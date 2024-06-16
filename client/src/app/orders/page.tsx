import React from "react";
import { getOrders } from "./get-orders";
import Order from "./order";

const Orders = async () => {
  const orders = await getOrders();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
        {orders && orders.length > 0 ? (
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-600 text-left">
                  Order ID
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-600 text-left">
                  Title
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-600 text-left">
                  Price
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-600 text-left">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-600 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
