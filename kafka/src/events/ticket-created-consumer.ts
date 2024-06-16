import { EachMessagePayload } from "kafkajs";
import { BaseConsumer } from "./base-consumer";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedConsumer extends BaseConsumer<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  groupId = "orders-service";

  onMessage(data: TicketCreatedEvent["data"], payload: EachMessagePayload) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);
  }
}
