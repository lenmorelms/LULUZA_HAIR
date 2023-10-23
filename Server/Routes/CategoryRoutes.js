import express from "express";
import asyncHandler from "express-async-handler";
import Category from "../Models/CategoryModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const categoryRoute = express.Router();

// GET ALL CATEGORIES
categoryRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.json(categories);
  })
);

// ADMIN GET ALL CATEGORIES WITHOUT SEARCH AND PEGINATION
categoryRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.json(categories);
  })
);

// GET SINGLE CATEGORY
categoryRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);

// DELETE CATEGORY
categoryRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.json({ message: "Category deleted" });
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);

// CREATE CATEGORY
categoryRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const newCategoryData = {
      name,
      description
    };
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      res.status(400);
      throw new Error("Category name already exist");
    } else {
      // const category = new Category(newCategoryData);

      // if (category) {
      //   const createdCategory = await category.save();
      //   res.status(201).json(createdCategory);
      // } else {
      //   res.status(400);
      //   throw new Error("Invalid category data");
      // }
      const category = await Category.create(newCategoryData);
      if (category) {
        res.status(201).json(category);
      } else {
        res.status(400);
        throw new Error("Invalid category data");
      }
    }
  })
);

// UPDATE CATEGORY
categoryRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, } = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  })
);
export default categoryRoute;