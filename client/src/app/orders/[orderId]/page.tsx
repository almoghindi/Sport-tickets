import { getOrder } from "./get-order";
import TimerExpiration from "./timer-expiration";
import Ticket from "./ticket";
import EmbeddedCheckoutButton from "./embedded-checkout-button";

const Order = async ({ params }: { params: { orderId: string } }) => {
  const order = await getOrder(params.orderId);
  const msLeft = order
    ? new Date(order.expiresAt).getTime() - new Date().getTime()
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>
        {order && order?.status !== "complete" && (
          <>
            <div className="mb-4">
              <p className="text-lg font-semibold">Ticket Title:</p>
              <p className="text-xl">{order?.ticket?.title}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Price:</p>
              <p className="text-xl">{order?.ticket?.price}$</p>
            </div>
            <div className="mb-4">
              <TimerExpiration expirationTime={Math.round(msLeft / 1000)} />
            </div>
            <div className="mt-6">
              {/* <StripeCheckoutModal order={order} /> */}
              <EmbeddedCheckoutButton order={order} isExpired={msLeft < 0} />
            </div>
          </>
        )}
        {order?.status === "complete" && (
          <>
            <p className="text-green-500 text-lg font-semibold">
              Order is complete
            </p>
            <p className="text-lg font-semibold mt-6">Here is your ticket:</p>
            <Ticket
              id={order?.ticket?.id}
              title={order?.ticket?.title}
              image={`/${order?.ticket?.sport}.webp`}
              date={new Date(order.ticket.date).toISOString()}
              sport={order?.ticket?.sport}
              price={order?.ticket?.price.toString()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
