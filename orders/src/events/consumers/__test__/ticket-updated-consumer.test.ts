import mongoose from "mongoose";
import { TicketUpdatedConsumer } from "../ticket-updated-consumer";
import { kafkaWrapper } from "../../../kafka-wrapper";
import { Ticket } from "../../../models/ticket";
import {
  SportsCategories,
  TicketUpdatedEventKafka,
  Topics,
} from "@ahgittix/common";
import { EachMessagePayload } from "kafkajs";

const setup = async () => {
  const consumer = new TicketUpdatedConsumer(kafkaWrapper.client);
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    id: ticketId,
    title: "concert",
    date: new Date(),
    sport: SportsCategories.Soccer,
    price: 20,
  });
  await ticket.save();

  const data: TicketUpdatedEventKafka["data"] = {
    id: ticket.id,
    title: "new concert",
    date: new Date(),
    sport: SportsCategories.Soccer,
    price: 15,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
  };

  const message: EachMessagePayload = {
    // @ts-ignore
    message: {
      offset: "1",
    },
    topic: Topics.TicketCreated,
    partition: 0,
  };
  return { consumer, data, message };
};

it("finds updates and saves a ticket", async () => {
  const { consumer, data, message } = await setup();
  await consumer.onMessage(data, message);

  const ticket = await Ticket.findOne({ _id: data.id });
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
});

it("rejects updates if version is out of order", async () => {
  const { consumer, data, message } = await setup();
  let error;
  data.version = 10;
  try {
    await consumer.onMessage(data, message);
  } catch (err) {
    error = err;
  }
  expect(error).toBeDefined();
});
