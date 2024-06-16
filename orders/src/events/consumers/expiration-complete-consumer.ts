import {
  BaseConsumer,
  ExpirationCompleteEventKafka,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../models/order";
import { kafkaWrapper } from "../../kafka-wrapper";
import { OrderCancelledProducer } from "../producers/order-cancelled-producer";

export class ExpirationCompleteConsumer extends BaseConsumer<ExpirationCompleteEventKafka> {
  topic: Topics.ExpirationComplete = Topics.ExpirationComplete;
  groupId: string = "expiration-service/" + this.topic;

  async onMessage(
    data: ExpirationCompleteEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "complete") {
      return;
    }

    order.set({ status: "cancelled" });
    await order.save();

    await new OrderCancelledProducer(kafkaWrapper.client).produce({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
  }
}
