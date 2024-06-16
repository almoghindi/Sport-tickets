import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@ahgittix/common";
import { Ticket } from "../models/ticket";
// import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { kafkaWrapper } from "../kafka-wrapper";
import { TicketCreatedProducer } from "../events/producers/ticket-created-producer";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, date, sport, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      date,
      sport,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    // await new TicketCreatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });
    await new TicketCreatedProducer(kafkaWrapper.client).produce({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      date: ticket.date,
      sport: ticket.sport,
      price: ticket.price,
      userId: ticket.userId,
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
