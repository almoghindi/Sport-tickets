import { Kafka, Producer } from "kafkajs";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class BaseProducer<T extends Event> {
  abstract subject: T["subject"];
  private producer: Producer;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async produce(data: T["data"]): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: "ticketing",
        messages: [
          {
            value: JSON.stringify(data),
          },
        ],
      });
      console.log("Event published to subject", this.subject);
    } catch (err) {
      console.error("Failed to publish event:", err);
      throw err;
    } finally {
      await this.producer.disconnect();
    }
  }
}
