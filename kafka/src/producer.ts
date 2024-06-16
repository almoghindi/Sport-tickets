import { Kafka } from "kafkajs";
import { BaseProducer } from "./events/base-producer";
import { Subjects } from "./events/subjects";

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}

class TicketCreatedProducer extends BaseProducer<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

const kafka = new Kafka({
  clientId: "ticketing",
  brokers: ["localhost:9092"],
});

const run = async () => {
  const producer = new TicketCreatedProducer(kafka);
  await producer.produce({
    id: "123",
    title: "Concert",
    price: 100,
  });
  console.log("Event published successfully");
};

run().catch((err) => {
  console.error("Error publishing event:", err);
});
