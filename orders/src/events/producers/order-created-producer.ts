import { BaseProducer, Topics, OrderCreatedEventKafka } from "@ahgittix/common";
import { Kafka } from "kafkajs";

export class OrderCreatedProducer extends BaseProducer<OrderCreatedEventKafka> {
  topic: Topics.OrderCreated = Topics.OrderCreated;
}
