import mongoose from "mongoose";
import request from "supertest";
import { OrderStatus } from "@ahgittix/common";
import { app } from "../../app";
import { stripe } from "../../stripe";
import { Order } from "../../models/order";
import { Payment } from "../../models/payment";

// jest.mock("../../stripe");

it("returns a 201 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  });
  await order.save();

  // Create Payment Intent
  const response = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
    })
    .expect(201);

  const clientSecret = response.body.clientSecret;
  expect(clientSecret).toBeDefined();

  const paymentIntentId = clientSecret.split("_secret_")[0];

  // Confirm Payment Intent
  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: "pm_card_visa",
  });
  expect(paymentIntent).toBeDefined();
  expect(paymentIntent.status).toBe("succeeded");

  // Save payment and confirm through API
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
      paymentIntentId: paymentIntent.id,
    })
    .expect(201);

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: paymentIntent.id,
  });

  expect(payment).not.toBeNull();
});

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
    })
    .expect(400);
});
