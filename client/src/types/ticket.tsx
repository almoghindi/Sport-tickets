import { SportsCategories } from "./sport-categories";

export interface Ticket {
  id: string;
  title: string;
  date: Date;
  sport: SportsCategories;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}
