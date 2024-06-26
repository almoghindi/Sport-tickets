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
      Based on the following list of available tickets and the user's last 10 ordered tickets, recommend the best 6 tickets for the user (make sure not to return the same ticket twice and dont forget to return id):

      Available Tickets:
      ${last50Tickets
        .map(
          (ticket) =>
            `- ${ticket._id}: ${ticket.title} (${ticket.sport}, $${ticket.price})`
        )
        .join("\n")}

      User's Last 10 Ordered Tickets:
      ${last10OrderedTickets
        .map(
          (order) =>
            `- ${order.ticket._id}: ${order.ticket.title} (${order.ticket.sport}, $${order.ticket.price})`
        )
        .join("\n")}

      Recommendations:
    `;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const openAIResponse = response.choices[0]?.message?.content?.trim();

      if (openAIResponse) {
        const recommendations = openAIResponse
          .split("\n")
          .map((line) => {
            const match = line.match(/(\w+):/);
            if (match) {
              const [_, id, title, sport, price] = match;
              const ticket = last50Tickets.find((t) => t.id.toString() === id);
              return ticket
                ? {
                    id: ticket._id,
                    title: ticket.title,
                    sport: ticket.sport,
                    date: ticket.date,
                    price: ticket.price,
                  }
                : null;
            }
            return null;
          })
          .filter(
            (ticket): ticket is NonNullable<typeof ticket> => ticket !== null
          );

        res.json({ recommendations });
      } else {
        throw new Error("No recommendations returned from OpenAI");
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);

      const fallbackTickets = await Ticket.find().sort({ date: -1 }).limit(6);
      const fallbackRecommendations = fallbackTickets.map((ticket) => ({
        id: ticket._id,
        title: ticket.title,
        sport: ticket.sport,
        date: ticket.date,
        price: ticket.price,
      }));
      res.status(200).json({ recommendations: fallbackRecommendations });
    }
  }
);

export { router as recommendationsRouter };
