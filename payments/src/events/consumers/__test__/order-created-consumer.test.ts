import { OrderCreatedEventKafka, OrderStatus, Topics } from "@ahgittix/common";
import { kafkaWrapper } from "../../../kafka-wrapper";
import { OrderCreatedConsumer } from "../order-created-consumer";
import mongoose from "mongoose";
import { EachMessagePayload } from "kafkajs";
import { Order } from "../../../models/order";

const setup = async () => {
  const consumer = new OrderCreatedConsumer(kafkaWrapper.client);

  const data: OrderCreatedEventKafka["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: new Date().toISOString(),
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 10,
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

it("replicates the order info", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);
  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});
