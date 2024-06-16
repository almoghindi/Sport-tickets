import { getTicket } from "./get-ticket";
import BuyButton from "./buy-button";

const Ticket = async ({ params }: { params: { ticketId: string } }) => {
  const ticket = await getTicket(params.ticketId);

  return (
    <div>
      {ticket && (
        <>
          <h1>Ticket</h1>
          <p>{ticket?.title}</p>
          <p>{ticket?.price}</p>
          <BuyButton ticket={ticket} />
        </>
      )}
      {!ticket && <p>No ticket found</p>}
    </div>
  );
};

export default Ticket;
