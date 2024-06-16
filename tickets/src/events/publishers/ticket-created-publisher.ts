import { Publisher, Subjects, TicketCreatedEvent } from "@ahgittix/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
