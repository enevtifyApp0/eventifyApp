import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    bookMsg: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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