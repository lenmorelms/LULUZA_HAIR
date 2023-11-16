import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import Product from "./../Models/ProductModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "images");
  },
  filename: function(req, file, cb) {
    return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
// const galleryStorage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "gallery");
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${file.originalname + '-' + Date.now()}`);
//   }
// });
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const uploadProductImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
  fileFilter
});
// const uploadProductGallery = multer({
//   storage: galleryStorage,
//   limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
//   fileFilter
// });

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// GET PRODUCTS BY CATEGORY
productRoute.get(
  "/:category",
  asyncHandler(async (req, res) => {
    // mongo db search through an array
    // const product = await Product.findById(req.params.category);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.fname+" "+req.user.lname,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      //await product.remove();
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  // uploadProductImage.single("image"),
  // ## NEW CODE
  // uploadProductImage.single("image"),
  // uploadProductImage.array("files"),
  uploadProductImage.fields([{ name: 'image' }, { name: 'gallery', maxCount: 5 }]),
  // uploadProductGallery.array("multipleFiles"),
  asyncHandler(async (req, res) => {
    const { name, categories, price, description, countInStock } = req.body;
    // Image support
    // const image = req.file.filename;
    // ## NEW CODE

    // const singleFile = req.file;
    // const multipleFiles = req.files;
    const image = req.files.image[0].filename;
    // path: req.files.singleFile[0].path,
    const gallery = req.files.gallery.map((file) => ({
      filename: file.filename,
      // path: file.path,
    }));
    const newProductData = {
      name,
      categories,
      price,
      description,
      countInStock,
      // image: singleFile.filename,
      image: image,
      gallery,
    }
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      // const product = new Product({
      //   name,
      //   price,
      //   description,
      //   image,
      //   coupons,
      //   countInStock,
      //   user: req.user._id,
      // });
      
      // Image support
      const product = new Product(newProductData);

      if (product) {
        const createdproduct = await product.save()
        // ## NEW CODE
        // .then(
        //   () => {
        //     createdproduct.gallery = gallery;
        //   }
        // );
        // const galleryFolder = (createdproduct._id).toString();
        // console.log(galleryFolder);
        // const __dirname = path.resolve();
        // const galleryPath = path.join(__dirname, 'gallery', galleryFolder);
        // fs.mkdir(galleryPath, { recursive: true }, (err) => {
        //   if(!err) { console.log("folder created"); }
        //   else { console.log(err); }
        // });
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  // uploadProductImage.single("image"),
  uploadProductImage.fields([{ name: 'image' }, { name: 'gallery', maxCount: 5 }]),
  // uploadProductGallery,
  asyncHandler(async (req, res) => {
    const { name, price, sale, salePercentage, description, coupons, countInStock } = req.body;
    // Image support
    // const image = req.file.filename;
    // ## NEW CODE
    // const image = req.files.image[0].filename;
    // // // path: req.files.singleFile[0].path,
    // const gallery = req.files.gallery.map((file) => ({
    //   filename: file.filename,
    //   // path: file.path,
    // }));

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.sale = sale || product.sale;
      product.salePercentage = salePercentage || product.salePercentage;
      product.description = description || product.description;
      product.countInStock = countInStock || product.countInStock;
      // product.image = image || product.image;
      // product.gallery = gallery || product.gallery;
      product.coupons = coupons || product.coupons;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
      // console.log(image)
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
export default productRoute;
