import mongoose from "mongoose";
import { app } from "./app";
import { kafkaWrapper } from "./kafka-wrapper";
import { OrderCreatedConsumer } from "./events/consumers/order-created-consumer";
import { OrderCancelledConsumer } from "./events/consumers/order-cancelled-consumer";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
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
    await new OrderCreatedConsumer(kafkaWrapper.client).consume();
    await new OrderCancelledConsumer(kafkaWrapper.client).consume();

    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000!!");
  });
};

start();
