import mongoose from "mongoose";
import {
  OrderStatus,
  ExpirationCompleteEventKafka,
  Topics,
  SportsCategories,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";
import { kafkaWrapper } from "../../../kafka-wrapper";
import { ExpirationCompleteConsumer } from "../expiration-complete-consumer";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";

const setup = async () => {
  const consumer = new ExpirationCompleteConsumer(kafkaWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    date: new Date(),
    sport: SportsCategories.Soccer,
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEventKafka["data"] = {
    orderId: order.id,
  };
  //   @ts-ignore
  const message: EachMessagePayload = {
    // @ts-ignore
    message: {
      offset: "1",
    },
    topic: Topics.TicketCreated,
    partition: 0,
  };

  return { consumer, data, message, ticket, order };
};

it("updates the order status to cancelled", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);
  const updatedOrder = await Order.findById(data.orderId);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);
  expect(kafkaWrapper.client.producer().send).toHaveBeenCalled();
});
