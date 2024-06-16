import Queue from "bull";
import { kafkaWrapper } from "../kafka-wrapper";
import { ExpirationCompleteProducer } from "../events/producers/expiration-complete-producer";
interface Payload {
  orderId: string;
}

export const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  await new ExpirationCompleteProducer(kafkaWrapper.client).produce({
    orderId: job.data.orderId,
  });
});
