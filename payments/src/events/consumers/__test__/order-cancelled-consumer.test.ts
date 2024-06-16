import {
  OrderCancelledEventKafka,
  OrderStatus,
  Topics,
} from "@ahgittix/common";
import { kafkaWrapper } from "../../../kafka-wrapper";
import { OrderCancelledConsumer } from "../order-cancelled-consumer";
import mongoose from "mongoose";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../../models/order";

const setup = async () => {
  const consumer = new OrderCancelledConsumer(kafkaWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    price: 10,
  });

  await order.save();

  const data: OrderCancelledEventKafka["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  const message: EachMessagePayload = {
    // @ts-ignore
    message: {
      offset: "1",
    },
    topic: Topics.OrderCreated,
    partition: 0,
  };

  return { consumer, data, message };
};

it("updates the order status to cancelled", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);
  const updatedOrder = await Order.findById(data.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
