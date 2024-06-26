"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Order } from "@/types/order";

const stripePromise = loadStripe(process.env.STRIPE_PROMISE!);

const EmbeddedCheckoutButton = ({
  order,
  isExpired,
}: {
  order: Order;
  isExpired: boolean;
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isExpired) {
      handleCloseModal();
    }
  }, [isExpired]);

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch(`/api/embedded-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          orderPrice: order.ticket.price,
          name: order.ticket.title,
        }),
      });
      const data = await response.json();
      return data.client_secret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      setPaymentError("Unable to initiate payment. Please try again later.");
      return null;
    }
  }, [order.id, order.ticket.price, order.ticket.title]);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  return (
    <div id="checkout" className="my-4">
      <button
        className="px-5 py-2 text-lg text-white bg-blue-800 rounded hover:bg-blue-700 transition duration-300"
        onClick={handleCheckoutClick}
        disabled={isExpired}
      >
        Checkout
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-full max-w-3xl">
          <h3 className="font-bold text-black text-lg ">Embedded Checkout</h3>
          <div className="py-4">
            {showCheckout && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
          <div className="modal-action mb-4">
            <form method="dialog">
              <button
                className="px-5 py-2 text-lg text-white bg-red-800 rounded hover:bg-red-700 transition duration-300"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmbeddedCheckoutButton;
