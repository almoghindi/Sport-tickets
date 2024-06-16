"use client";
import React from "react";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

interface TicketProps {
  id: string;
  image: string;
  title: string;
  date: string;
  sport: string;
  price: string;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  image,
  title,
  date,
  sport,
  price,
}) => {
  return (
    <div className="flex flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto my-5">
      <div className="flex items-center justify-center p-5">
        <Image
          src={image}
          alt="Ticket Image"
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-full"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Sport:</strong> {sport}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Price:</strong> ${price}
        </p>
      </div>
      <div className="flex items-center justify-center p-5 bg-gray-100">
        <QRCode value={id} size={100} />
      </div>
    </div>
  );
};

export default Ticket;
