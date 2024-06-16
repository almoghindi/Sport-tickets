"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { ReactNode, useState } from "react";
import { Order } from "@/types/order";
import StripeForm from "./stripe-form";
import Modal from "@/app/components/modal";
import Button from "@/app/components/button";

const stripePromise = loadStripe(
  "pk_test_51PQSLORrxoFAQ6cr8k67Sbtza0Ng1vmw1ddCEpWjWhrdG7v3ZdHcQaAYJDESRXiVYxckt4gaBlYGXmtY8sRRF90I00bhGMBll7"
);

const StripeWrapper = ({ children }: { children: ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

const StripeCheckoutModal = ({ order }: { order: Order }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSuccess = () => {
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal} text="Checkout" type="button" />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <StripeWrapper>
          <StripeForm order={order} onSuccess={handleSuccess} />
        </StripeWrapper>
      </Modal>
    </>
  );
};

export default StripeCheckoutModal;
