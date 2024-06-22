import express, { Request, Response } from "express";
import { requireAuth } from "@ahgittix/common";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get(
  "/api/orders/recommendations",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const userId = req.currentUser!.id;

      const last50Tickets = await Ticket.find().sort({ date: -1 }).limit(50);

      const last10OrderedTickets = await Order.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("ticket");

      const prompt = `
    Based on the following list of available tickets and the user's last 10 ordered tickets, recommend the best 8 tickets for the user:
    
    Available Tickets:
    ${last50Tickets
      .map((ticket) => `- ${ticket.title} (${ticket.sport}, $${ticket.price})`)
      .join("\n")}

    User's Last 10 Ordered Tickets:
    ${last10OrderedTickets
      .map(
        (order) =>
          `- ${order.ticket.title} (${order.ticket.sport}, $${order.ticket.price})`
      )
      .join("\n")}
    
    Recommendations:
  `;

      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const recommendations = response.choices[0].text.trim();
      res.json({ recommendations });
    } catch (err) {
      const fallbackTickets = await Ticket.find().sort({ date: -1 }).limit(8);
      res.json({ fallbackTickets });
    }
  }
);

export { router as recommendOrderRouter };
