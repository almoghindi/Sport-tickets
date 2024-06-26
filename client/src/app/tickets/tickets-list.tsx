"use client";
import React, { useState, useEffect } from "react";
import { Ticket as TicketType } from "@/types/ticket";
import Ticket from "./ticket";
import Filters from "./filters/filters";
import { SportFilterOptions } from "@/types/sport-categories";
import useRequest from "@/hooks/use-request";

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

  const { sendRequest, requestErrors } = useRequest();

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

  const getRecommendations = async () => {
    await sendRequest({
      url: "/api/orders/recommendations",
      method: "GET",
      onSuccess: (data) => {
        setFilteredTickets(data.recommendations);
      },
    });
  };

  return (
    <div className="flex justify-center w-4/5 mx-auto">
      <div className="w-1/4 p-4">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onGetRecommendations={getRecommendations}
        />
      </div>
      <div className="w-3/4 p-4">
        {requestErrors && (
          <div>
            {requestErrors.map((error, index) => (
              <p key={index} className="text-red-500">
                {error.message}
              </p>
            ))}
          </div>
        )}
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
            <p className="text-white text-center">No tickets found</p>
          ))}
      </div>
    </div>
  );
};

export default TicketList;
