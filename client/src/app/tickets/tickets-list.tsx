"use client";
import React, { useState, useEffect } from "react";
import { Ticket as TicketType } from "@/types/ticket";
import Ticket from "./ticket";
import Filters from "./filters/filters";
import { SportFilterOptions } from "@/types/sport-categories";

interface TicketListProps {
  tickets: TicketType[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const [filteredTickets, setFilteredTickets] = useState<TicketType[]>(tickets);
  const [filters, setFilters] = useState({
    title: "",
    minPrice: 0,
    maxPrice: Infinity,
    date: "",
    sport: "All" as SportFilterOptions,
  });

  useEffect(() => {
    let filtered = tickets;
    if (filters.title) {
      filtered = filtered.filter((ticket) =>
        ticket.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    if (filters.minPrice !== 0 || filters.maxPrice !== Infinity) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.price >= filters.minPrice && ticket.price <= filters.maxPrice
      );
    }
    if (filters.date) {
      filtered = filtered.filter((ticket) => {
        const ticketDate = new Date(ticket.date).toISOString().split("T")[0];
        return ticketDate === filters.date;
      });
    }
    if (filters.sport !== "All") {
      filtered = filtered.filter((ticket) => ticket.sport === filters.sport);
    }
    setFilteredTickets(filtered);
  }, [filters, tickets]);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      {filteredTickets && (
        <ul className="flex flex-wrap justify-center gap-4 mt-6">
          {filteredTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              image={`/${ticket.sport}.webp`}
              date={ticket.date}
              sport={ticket.sport}
              price={ticket.price.toString()}
              userId={ticket.userId}
              version={ticket.version}
            />
          ))}
        </ul>
      )}
      {!filteredTickets ||
        (filteredTickets.length === 0 && (
          <p className="text-white">No tickets found</p>
        ))}
    </div>
  );
};

export default TicketList;
