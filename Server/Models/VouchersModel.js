import mongoose from "mongoose";

const voucherSchema = mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isReedemed: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Vouchers = mongoose.model("Vouchers", voucherSchema);

export default Vouchers;
