import { getTicket } from "./get-ticket";
import BuyButton from "./buy-button";
import Image from "next/image";

const Ticket = async ({ params }: { params: { ticketId: string } }) => {
  const ticket = await getTicket(params.ticketId);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      {ticket ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
          <Image
            src={`/${ticket.sport}.webp`}
            alt={ticket.title}
            width={400}
            height={250}
            className="rounded-md mb-4"
          />
          <h1 className="text-2xl font-bold mb-4 ">{ticket.title}</h1>
          <p className="text-lg text-gray-700 mb-2">Price: ${ticket.price}</p>
          <BuyButton ticket={ticket} />
        </div>
      ) : (
        <p className="text-gray-500">No ticket found</p>
      )}
    </div>
  );
};

export default Ticket;
