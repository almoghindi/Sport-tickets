import {
  OrderCancelledEventKafka,
  Topics,
  BaseConsumer,
  OrderStatus,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../models/order";

export class OrderCancelledConsumer extends BaseConsumer<OrderCancelledEventKafka> {
  topic: Topics.OrderCancelled = Topics.OrderCancelled;
  groupId: string = "payments-service/" + this.topic;
  async onMessage(
    data: OrderCancelledEventKafka["data"],
    payload: EachMessagePayload
  ): Promise<void> {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();
  }
}
