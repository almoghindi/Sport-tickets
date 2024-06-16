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
  [body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for a cancelled order");
    }

    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status !== "succeeded") {
        throw new BadRequestError("Payment not successful");
      }

      const payment = Payment.build({
        orderId,
        stripeId: paymentIntent.id,
      });
      await payment.save();

      new PaymentCreatedProducer(kafkaWrapper.client).produce({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
      });

      return res.status(201).send({ payment });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: { orderId },
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  }
);

export { router as createChargeRouter };
