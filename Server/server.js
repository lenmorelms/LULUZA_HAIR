import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import categoryRoute from "./Routes/CategoryRoutes.js";
// import wishListRouter from "./Routes/WishListRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static('public'));
app.use('/images', express.static('images'));

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
// PAYPAL
// app.get("/api/config/paypal", (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID);
// });

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server run in port ${PORT}`));
