import {
  Topics,
  BaseProducer,
  ExpirationCompleteEventKafka,
} from "@ahgittix/common";

export class ExpirationCompleteProducer extends BaseProducer<ExpirationCompleteEventKafka> {
  topic: Topics.ExpirationComplete = Topics.ExpirationComplete;
}
