import mongoose from "mongoose";

const returnsSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      default: "return",
    },
  },
  {
    timestamps: true,
  }
);

const Returns = mongoose.model("Returns", returnsSchema);

export default Returns;
