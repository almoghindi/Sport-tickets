import {
  BaseConsumer,
  OrderCancelledEventKafka,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { TicketUpdatedProducer } from "../producers/ticket-updated-producer";
import { Ticket } from "../../models/ticket";

export class OrderCancelledConsumer extends BaseConsumer<OrderCancelledEventKafka> {
  topic: Topics.OrderCancelled = Topics.OrderCancelled;
  groupId: string = "tickets-service/order-cancelled";

  async onMessage(
    data: OrderCancelledEventKafka["data"],
    message: EachMessagePayload
  ): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ orderId: undefined });
    await ticket.save();

    await new TicketUpdatedProducer(this.kafka).produce({
      id: ticket.id,
      title: ticket.title,
      date: ticket.date,
      sport: ticket.sport,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
  }
}
