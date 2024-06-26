import React from "react";
import { getOrders } from "./get-orders";
import Order from "./order";

const Orders = async () => {
  const orders = await getOrders();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4 sm:p-6">
      <div className="bg-gray-700 p-4 sm:p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Your Orders
        </h1>
        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr>
                  <th className="py-2 px-2 sm:px-4 border-b-2 border-gray-600 text-left">
                    Order ID
                  </th>
                  <th className="py-2 px-2 sm:px-4 border-b-2 border-gray-600 text-left">
                    Title
                  </th>
                  <th className="py-2 px-2 sm:px-4 border-b-2 border-gray-600 text-left">
                    Price
                  </th>
                  <th className="py-2 px-2 sm:px-4 border-b-2 border-gray-600 text-left">
                    Status
                  </th>
                  <th className="py-2 px-2 sm:px-4 border-b-2 border-gray-600 text-left">
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
          </div>
        ) : (
          <p className="text-center">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
