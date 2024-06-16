import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
} from "@ahgittix/common";
import { Ticket } from "../models/ticket";
// import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
// import { natsWrapper } from "../nats-wrapper";
import { kafkaWrapper } from "../kafka-wrapper";
import { TicketUpdatedProducer } from "../events/producers/ticket-updated-producer";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.orderId) {
      throw new BadRequestError("Cannot edit a reserved ticket");
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: req.body.title,
      date: req.body.date,
      sport: req.body.sport,
      price: req.body.price,
    });
    await ticket.save();
    // new TicketUpdatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });

    await new TicketUpdatedProducer(kafkaWrapper.client).produce({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      date: ticket.date,
      sport: ticket.sport,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
