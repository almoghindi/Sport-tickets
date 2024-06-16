import {
  BaseProducer,
  Topics,
  OrderCancelledEventKafka,
} from "@ahgittix/common";
import { Kafka } from "kafkajs";

export class OrderCancelledProducer extends BaseProducer<OrderCancelledEventKafka> {
  topic: Topics.OrderCancelled = Topics.OrderCancelled;

  constructor(kafka: Kafka) {
    super(kafka);
  }
}
