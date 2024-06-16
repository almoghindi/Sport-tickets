import { Ticket } from "./ticket";

export interface Order {
  id: string;
  status: string;
  expiresAt: Date;
  ticket: Ticket;
  userId: string;
}
