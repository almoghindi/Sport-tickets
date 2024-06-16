import {
  Topics,
  BaseConsumer,
  TicketCreatedEventKafka,
} from "@ahgittix/common";
import { Ticket } from "../../models/ticket";
import { EachMessagePayload } from "kafkajs";

export class TicketCreatedConsumer extends BaseConsumer<TicketCreatedEventKafka> {
  topic: Topics.TicketCreated = Topics.TicketCreated;
  groupId: string = "orders-service/" + this.topic;

  async onMessage(
    data: TicketCreatedEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { id, title, date, sport, price } = data;

    try {
      const ticket = Ticket.build({
        id,
        title,
        date,
        sport,
        price,
      });
      await ticket.save();
    } catch (error) {
      console.error(`Failed to process message: ${error}`);
    }
  }
}
