import {
  BaseProducer,
  Topics,
  TicketUpdatedEventKafka,
} from "@ahgittix/common";
import { Kafka } from "kafkajs";

export class TicketUpdatedProducer extends BaseProducer<TicketUpdatedEventKafka> {
  topic: Topics.TicketUpdated = Topics.TicketUpdated;

  constructor(kafka: Kafka) {
    super(kafka);
  }
}
