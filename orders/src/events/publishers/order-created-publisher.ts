import { Publisher, OrderCreatedEvent, Subjects } from "@ahgittix/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
