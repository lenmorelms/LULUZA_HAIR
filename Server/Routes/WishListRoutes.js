import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import WishList from "../Models/WishListModel.js";

const wishListRouter = express.Router();

// CREATE WISHLIST
wishListRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      wishListItems,
      quantity,
      currency,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (wishListItems && wishListItems.length === 0) {
      res.status(400);
      throw new Error("No wishList items");
      return;
    } else {
      const wishList = new WishList({
        wishListItems,
        user: req.user._id,
        quantity,
        currency,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createWishList = await wishList.save();
      res.status(201).json(createWishList);
    }
  })
);

// ADMIN GET ALL WISHLISTS
wishListRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const wishLists = await WishList.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
      res.json(wishLists);
  })
);
// WISHLISTS
wishListRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const wishList = await WishList.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(wishList);
  })
);

// GET WISHLIST BY ID
wishListRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const wishList = await WishList.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (wishList) {
      res.json(wishList);
    } else {
      res.status(404);
      throw new Error("WishList Not Found");
    }
  })
);

// USER DELETE WISHLIST BY ID
wishListRouter.delete(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
        const wishList = await WishList.findById(req.params.id);
        if(wishList) {
            await WishList.deleteOne({ _id: wishList._id });
            res.json({ message: "WishList deleted" });
        } else {
            res.status(404);
            throw new Error("WishList not Found");
        }
    })
);

// ADMIN DELETE WISHLIST BY ID
wishListRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const wishList = await WishList.findById(req.params.id);
        if(wishList) {
            await WishList.deleteOne({ _id: wishList._id });
            res.json({ message: "WishList deleted" });
        } else {
            res.status(404);
            throw new Error("WishList not Found");
        }
    })
);

export default wishListRouter;