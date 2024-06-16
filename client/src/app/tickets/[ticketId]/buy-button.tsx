"use client";
import Button from "@/app/components/button";
import useRequest from "@/hooks/use-request";
import { Ticket } from "@/types/ticket";
import { useRouter } from "next/navigation";

const BuyButton = ({ ticket }: { ticket: Ticket }) => {
  const { sendRequest } = useRequest();
  const router = useRouter();

  const onBuy = async () => {
    await sendRequest({
      url: `/api/orders`,
      method: "POST",
      body: {
        ticketId: ticket?.id,
      },
      onSuccess: (order) => {
        router.push(`/orders/${order.id}`);
      },
    });
  };
  return <Button onClick={onBuy} text="Buy" type="button" />;
};

export default BuyButton;
