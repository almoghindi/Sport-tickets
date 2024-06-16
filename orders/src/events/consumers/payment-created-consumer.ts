import {
  Topics,
  BaseConsumer,
  PaymentCreatedEventKafka,
  OrderStatus,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../models/order";

export class PaymentCreatedConsumer extends BaseConsumer<PaymentCreatedEventKafka> {
  topic: Topics.PaymentCreated = Topics.PaymentCreated;
  groupId: string = "orders-service/" + this.topic;

  async onMessage(
    data: PaymentCreatedEventKafka["data"],
    msg: EachMessagePayload
  ): Promise<void> {
    const { id, orderId, stripeId } = data;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();
  }
}
