import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Vouchers from "../Models/VouchersModel.js";

const vouchersRouter = express.Router();

// CREATE VOUCHER
vouchersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { currency, amount, senderName, recipientName, recipientEmail, message } = req.body;

    const voucher = await Vouchers.create({
      currency,
      amount,
      senderName,
      recipientName,
      recipientEmail,
      message,
    });

    if (voucher) {
      res.status(201).json(voucher);
    } else {
      res.status(400);
      throw new Error("Invalid Voucher Data");
    }
  })
);

// VOUCHER IS PAID FOR
vouchersRouter.put(
  "/:id/buy",
  protect,
  asyncHandler(async (req, res) => {
    const voucher = await Vouchers.findById(req.params.id);

    if (voucher) {
      voucher.isPaid = true;
      voucher.paidAt = Date.now();
      voucher.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedVoucher = await voucher.save();
      res.json(updatedVoucher);
    } else {
      res.status(404);
      throw new Error("Voucher Not Found");
    }
  })
);
// PAY USING VOUCHER
vouchersRouter.put(
  "/pay",
  asyncHandler(async (req, res) => {
    const { id, orderId, currency, amount } = req.body;
    const voucher = await Vouchers.findById(id);

    if(voucher && voucher.isPaid && !voucher.isReedemed) {
      if(currency === voucher.currency && amount <= voucher.amount) {
        voucher.isReedemed = true;
        voucher.reedemedAt = Date.now();
        voucher.orderId = orderId;

        const updatedVoucher = await voucher.save();
        res.json(updatedVoucher);
      } else {
        res.send("Select same currency as on voucher and amount not greater than the voucher");
      }
    } else {
      res.status(404);
      throw new Error("Voucher Not Found");
    }
  })
);
// GET VOUCHER BY ID
vouchersRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const voucher = await Vouchers.findById(req.params.id);

    if (voucher) {
      res.json(voucher);
    } else {
      res.status(404);
      throw new Error("Voucher Not Found");
    }
  })
);

export default vouchersRouter;
