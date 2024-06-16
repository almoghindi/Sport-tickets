import {
  Topics,
  BaseConsumer,
  TicketUpdatedEventKafka,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedConsumer extends BaseConsumer<TicketUpdatedEventKafka> {
  topic: Topics.TicketUpdated = Topics.TicketUpdated;
  groupId: string = "orders-service/" + this.topic;

  async onMessage(
    data: TicketUpdatedEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { topic, partition, message } = payload;
    const { id, title, price } = data;

    try {
      const ticket = await Ticket.findByEvent(data);
      if (!ticket) {
        throw new Error("Ticket not found");
      }
      ticket.set({ title, price });
      await ticket.save();
    } catch (error) {
      console.error(`Failed to process message: ${error}`);
      throw error;
    }
  }
}
