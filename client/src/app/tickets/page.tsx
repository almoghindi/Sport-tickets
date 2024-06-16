import { getTickets } from "./get-tickets";
import Ticket from "./ticket";

const Tickets = async () => {
  const tickets = await getTickets();

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white my-8 mt-24">Tickets</h1>
      {tickets && (
        <ul className="flex flex-wrap justify-center gap-4 mt-6">
          {tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              image={`/${ticket.sport}.webp`}
              date={ticket.date}
              sport={ticket.sport}
              price={ticket.price.toString()}
            />
          ))}
        </ul>
      )}
      {!tickets ||
        (tickets.length === 0 && (
          <p className="text-white">No tickets found</p>
        ))}
    </div>
  );
};
export default Tickets;
