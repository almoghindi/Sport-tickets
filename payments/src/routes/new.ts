import express, { Request, Response } from "express";
import { body } from "express-validator";
import { stripe } from "../stripe";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@ahgittix/common";
import { PaymentCreatedProducer } from "../events/producers/payment-created-producer";
import { kafkaWrapper } from "../kafka-wrapper";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("orderId").not().isEmpty(), body("sessionId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, sessionId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is cancelled");
    }
    const payment = Payment.build({
      orderId,
      stripeId: sessionId,
    });
    await payment.save();

    const producer = new PaymentCreatedProducer(kafkaWrapper.client);
    await producer.produce({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    res.status(200).send({ success: true });
  }
);

export { router as createChargeRouter };
