"use client";

import React from "react";
import Image from "next/image";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { SportsCategories } from "@/types/sport-categories";
import { Ticket as TicketType } from "@/types/ticket";
import HeartButton from "../tickets/heart-button";
import useRequest from "@/hooks/use-request";

interface TicketProps {
  id: string;
  image: string;
  title: string;
  date: Date | string;
  sport: SportsCategories;
  price: string;
  userId: string;
  version: number;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  image,
  title,
  date,
  sport,
  price,
  userId,
  version,
}) => {
  const formattedDate =
    typeof date === "string"
      ? new Date(date)
      : date instanceof Date
      ? date
      : new Date();
  const router = useRouter();

  const { sendRequest, isLoading, requestErrors } = useRequest();

  const onBuy = async () => {
    await sendRequest({
      url: `/api/orders`,
      method: "POST",
      body: {
        ticketId: id,
      },
      onSuccess: (order) => {
        router.push(`/orders/${order.id}`);
      },
    });
  };

  const ticket: TicketType = {
    id,
    title,
    date: formattedDate,
    sport,
    price: Number(price),
    userId,
    version,
  };

  return (
    <div className="ticket bg-white rounded-lg shadow-md overflow-hidden w-64 h-86 mx-auto text-center my-5">
      <div className="ticket-header bg-red-950 p-5 relative text-white">
        <Image
          src={image}
          alt="Ticket Image"
          width={120}
          height={120}
          className="w-20 h-20 object-cover rounded-full mx-auto"
        />
        <h2 className="ticket-title text-lg font-bold mt-2 truncate">
          {title}
        </h2>
        <HeartButton ticket={ticket} />
      </div>
      <div className="ticket-body p-5 bg-gray-100">
        <Button text={`Buy Ticket - ${price}$`} onClick={onBuy} type="button" />
        <div className="ticket-details flex justify-around mt-2">
          <div className="detail text-center">
            <span className="label block text-sm text-gray-600">Date</span>
            <span className="value block text-lg font-bold">
              {formattedDate.toISOString().slice(0, 10)}
            </span>
          </div>
          <div className="detail text-center ml-4">
            <span className="label block text-sm text-gray-600">Sport</span>
            <span className="value block text-lg font-bold">{sport}</span>
          </div>
        </div>
      </div>
      {requestErrors && (
        <div className="text-red-500 mt-2">
          {requestErrors.map((error) => (
            <div key={error.message}>{error.message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ticket;
