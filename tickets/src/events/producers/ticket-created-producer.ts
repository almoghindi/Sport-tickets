import {
  BaseProducer,
  Topics,
  TicketCreatedEventKafka,
} from "@ahgittix/common";
import { Kafka } from "kafkajs";

export class TicketCreatedProducer extends BaseProducer<TicketCreatedEventKafka> {
  topic: Topics.TicketCreated = Topics.TicketCreated;

  constructor(kafka: Kafka) {
    super(kafka);
  }
}
