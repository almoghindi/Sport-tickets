"use client";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useRequest from "@/hooks/use-request";
import { RootState } from "@/store/store";
import { Order } from "@/types/order";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";

const StripeForm = ({
  order,
  onSuccess,
}: {
  order: Order;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useUser();
  const { sendRequest, requestErrors } = useRequest();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const data = await sendRequest({
          url: "/api/payments",
          method: "post",
          body: {
            orderId: order.id,
          },
        });

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [order, sendRequest]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: {
            email: currentUser["currentUser"]?.email,
          },
        },
      }
    );

    if (error) {
      console.error("Error confirming card payment:", error);
    } else if (paymentIntent?.status === "succeeded") {
      try {
        await sendRequest({
          url: "/api/payments",
          method: "post",
          body: {
            orderId: order.id,
            paymentIntentId: paymentIntent.id,
          },
        });

        setSuccessMessage("Payment successful!");
        setTimeout(() => {
          setSuccessMessage(null);
          onSuccess();
          router.push("/tickets");
        }, 1000);
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <CardElement className="p-2 border border-gray-300 rounded-md" />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        Pay ${order?.ticket?.price}
      </button>
      {successMessage && (
        <div className="text-green-500 mt-2">{successMessage}</div>
      )}
      {requestErrors && (
        <div className="text-red-500 mt-2">
          {requestErrors.map((error) => (
            <div key={error.message}>{error.message}</div>
          ))}
        </div>
      )}
    </form>
  );
};

export default StripeForm;
