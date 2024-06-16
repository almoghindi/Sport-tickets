import { OrderCreatedConsumer } from "../order-created-consumer";
import {
  OrderCreatedEventKafka,
  OrderStatus,
  SportsCategories,
  Topics,
} from "@ahgittix/common";
import { kafkaWrapper } from "../../../kafka-wrapper";
import mongoose from "mongoose";
import { EachMessagePayload } from "kafkajs";
import { Ticket } from "../../../models/ticket";

// Mock Kafka client
jest.mock("../../../kafka-wrapper");

const setup = async () => {
  const consumer = new OrderCreatedConsumer(kafkaWrapper.client);

  const ticket = Ticket.build({
    title: "concert",
    date: new Date(),
    sport: SportsCategories.Soccer,
    price: 20,
    userId: "asdf",
  });
  await ticket.save();

  const data: OrderCreatedEventKafka["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdfJI",
    expiresAt: new Date().toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
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

  return { consumer, data, message, ticket };
};

it("sets the orderId of the ticket", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);

  const ticket = await Ticket.findById(data.ticket.id);
  expect(ticket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);

  expect(message.message.offset).toEqual("1");
});

it("consumes a ticket created event", async () => {
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
