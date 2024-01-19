import express from "express";
import asyncHandler from "express-async-handler";
import Returns from "../Models/ReturnsModel.js";
import Order from "../Models/OrderModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const returnsRoute = express.Router();

// GET ALL RETURNS REQUESTS
returnsRoute.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          _id: req.query.keyword,
          // _id: {
          //   $regex: req.query.keyword,
          //   $options: "i",
          // },
        }
      : {};
    const count = await Returns.countDocuments({ ...keyword });

    const returns = await Returns.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ _id: -1 })
    res.json({ returns, page, pages: Math.ceil(count / pageSize)});
  })
);

// GET RETURNS COUNT IN COLLECTION
returnsRoute.get(
    "/count",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const returns = await Returns.countDocuments({});
        res.json(returns);
    })
);

// GET SINGLE RETURN REQUEST
returnsRoute.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const returnRequest = await Returns.findById(req.params.id);
    if (returnRequest) {
      res.json(returnRequest);
    } else {
      res.status(404);
      throw new Error("Return request not Found");
    }
  })
);

// DELETE RETURN REQUEST
returnsRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const returnRequest = await Returns.findById(req.params.id);
    const returnOrder = await Order.findById(returnRequest.orderId);
    if (returnRequest && returnOrder) {
      await Returns.deleteOne({ _id: returnRequest._id });
      await Order.deleteOne({ _id: returnOrder._id});
      res.json({ message: "Return request deleted" });
    } else {
      res.status(404);
      throw new Error("Return request not Found");
    }
  })
);

// CREATE RETURN REQUEST
returnsRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const orderId = req.body.orderId;
    const user = req.body.user;
    const newReturnRequestData = {
      orderId,
      user
    };
    const returnRequestExist = await Returns.findOne({ orderId });
    if (returnRequestExist) {
      res.status(400);
      throw new Error("Return request already exist");
    } else {
      const returnRequest = await Returns.create(newReturnRequestData);
      if (returnRequest) {
        res.status(201).json(returnRequest);
      } else {
        res.status(400);
        throw new Error("Invalid oderId data");
      }
    }
  })
);

// UPDATE RETURN REQUEST
returnsRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { action } = req.body;
    const returnRequest = await Returns.findById(req.params.id);
    if (returnRequest) {
      returnRequest.action = action || returnRequest.action;

      const updatedReturnRequest = await returnRequest.save();
      res.json(updatedReturnRequest);
    } else {
      res.status(404);
      throw new Error("Return request not found");
    }
  })
);
export default returnsRoute;