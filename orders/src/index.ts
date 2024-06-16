import mongoose from "mongoose";
import { app } from "./app";
import { kafkaWrapper } from "./kafka-wrapper";
import { TicketCreatedConsumer } from "./events/consumers/ticket-created-consumer";
import { TicketUpdatedConsumer } from "./events/consumers/ticket-updated-consumer";
import { ExpirationCompleteConsumer } from "./events/consumers/expiration-complete-consumer";
import { PaymentCreatedConsumer } from "./events/consumers/payment-created-consumer";

const start = async () => {
  console.log("Starting up...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.KAFKA_BROKER) {
    throw new Error("KAFKA_BROKER must be defined");
  }
  if (!process.env.KAFKA_CLIENT_ID) {
    throw new Error("KAFKA_CLIENT_ID must be defined");
  }

  try {
    await kafkaWrapper.connect(process.env.KAFKA_CLIENT_ID, [
      process.env.KAFKA_BROKER,
    ]);

    await new TicketCreatedConsumer(kafkaWrapper.client).consume();

    await new TicketUpdatedConsumer(kafkaWrapper.client).consume();

    await new ExpirationCompleteConsumer(kafkaWrapper.client).consume();

    await new PaymentCreatedConsumer(kafkaWrapper.client).consume();

    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000!!");
  });
};

start();
