import { Kafka } from "kafkajs";
import { TicketCreatedConsumer } from "./events/ticket-created-consumer";

console.clear();

const kafka = new Kafka({
  clientId: "ticketing",
  brokers: ["localhost:9092"],
});

const run = async () => {
  const ticketCreatedConsumer = new TicketCreatedConsumer(kafka);
  await ticketCreatedConsumer.consume();

  const closeKafka = async () => {
    await ticketCreatedConsumer.close();
    process.exit();
  };

  process.on("SIGINT", closeKafka);
  process.on("SIGTERM", closeKafka);

  console.log("Consumer connected to Kafka");
};

run().catch((err) => {
  console.error("Error starting the consumer:", err);
});
