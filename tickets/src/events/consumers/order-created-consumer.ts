import {
  BaseConsumer,
  OrderCreatedEventKafka,
  OrderStatus,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";
import { kafkaWrapper } from "../../kafka-wrapper";
import { TicketUpdatedProducer } from "../producers/ticket-updated-producer";

export class OrderCreatedConsumer extends BaseConsumer<OrderCreatedEventKafka> {
  topic: Topics.OrderCreated = Topics.OrderCreated;
  groupId: string = "tickets-service/order-created";
  async onMessage(
    data: OrderCreatedEventKafka["data"],
    message: EachMessagePayload
  ): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });
    await ticket.save();

    await new TicketUpdatedProducer(this.kafka).produce({
      id: ticket.id,
      title: ticket.title,
      date: ticket.date,
      sport: ticket.sport,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
  }
}
