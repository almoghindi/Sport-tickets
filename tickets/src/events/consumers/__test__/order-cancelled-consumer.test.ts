import {
  OrderCancelledEventKafka,
  SportsCategories,
  Topics,
} from "@ahgittix/common";
import { kafkaWrapper } from "../../../kafka-wrapper";
import mongoose from "mongoose";
import { EachMessagePayload } from "kafkajs";
import { Ticket } from "../../../models/ticket";
import { OrderCancelledConsumer } from "../order-cancelled-consumer";

jest.mock("../../../kafka-wrapper");

const setup = async () => {
  const consumer = new OrderCancelledConsumer(kafkaWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    date: new Date(),
    sport: SportsCategories.Soccer,
    price: 20,
    userId: "asdf",
  });
  ticket.set({ orderId });
  await ticket.save();

  const data: OrderCancelledEventKafka["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  const message: EachMessagePayload = {
    // @ts-ignore
    message: {
      offset: "1",
    },
    topic: Topics.OrderCancelled,
    partition: 0,
  };

  return { consumer, data, message, ticket };
};

it("finds and updates the ticket", async () => {
  const { consumer, data, message, ticket } = await setup();
  await consumer.onMessage(data, message);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).toBeUndefined();
});

it("acks the message", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);
  expect(message.message.offset).toEqual("1");
});

it("consumes a ticket updated event", async () => {
  const { consumer, data, message } = await setup();

  kafkaWrapper.client.consumer = jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    subscribe: jest.fn(),
    run: jest.fn().mockImplementation(({ eachMessage }) => {
      eachMessage({
        topic: message.topic,
        partition: message.partition,
        message: {
          value: JSON.stringify(data),
        },
      });
    }),
  }));

  await consumer.consume();

  expect(kafkaWrapper.client.consumer).toHaveBeenCalled();
});
