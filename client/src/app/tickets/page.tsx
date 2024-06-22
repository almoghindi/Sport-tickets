import { getTickets } from "./get-tickets";
import TicketList from "./tickets-list";

const Tickets = async () => {
  const tickets = await getTickets();

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white my-8 mt-24">Tickets</h1>
      {tickets && <TicketList tickets={tickets} />}
    </div>
  );
};
export default Tickets;
