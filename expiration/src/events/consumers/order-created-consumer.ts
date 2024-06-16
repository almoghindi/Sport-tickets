import {
  BaseConsumer,
  OrderCreatedEventKafka,
  OrderStatus,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload, Kafka } from "kafkajs";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedConsumer extends BaseConsumer<OrderCreatedEventKafka> {
  topic: Topics.OrderCreated = Topics.OrderCreated;
  groupId: string = "expiration-service/" + this.topic;

  constructor(client: Kafka) {
    super(client);
  }

  async onMessage(
    data: OrderCreatedEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );
  }
}
