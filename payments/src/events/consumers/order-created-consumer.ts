import {
  BaseConsumer,
  OrderCreatedEventKafka,
  OrderStatus,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../models/order";

export class OrderCreatedConsumer extends BaseConsumer<OrderCreatedEventKafka> {
  topic: Topics.OrderCreated = Topics.OrderCreated;
  groupId: string = "payments-service/" + this.topic;
  async onMessage(
    data: OrderCreatedEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const order = Order.build({
      id: data.id,
      version: data.version,
      status: data.status,
      userId: data.userId,
      price: data.ticket.price,
    });
    await order.save();
  }
}
