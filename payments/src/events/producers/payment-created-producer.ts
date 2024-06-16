import {
  Topics,
  BaseProducer,
  PaymentCreatedEventKafka,
} from "@ahgittix/common";

export class PaymentCreatedProducer extends BaseProducer<PaymentCreatedEventKafka> {
  topic: Topics.PaymentCreated = Topics.PaymentCreated;
}
