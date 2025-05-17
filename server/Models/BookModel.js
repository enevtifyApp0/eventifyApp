import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    bookMsg: {
      type: String,
      required: false, // جعلها اختيارية
    },
    email: {
      type: String,
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    likes: {
      count: {
        type: Number,
        default: 0,
      },
      users: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const BookModel = mongoose.model("book", BookSchema);

export default BookModel;
