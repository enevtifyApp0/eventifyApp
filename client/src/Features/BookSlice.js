import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

// Save a new booking
export const saveBook = createAsyncThunk(
  "book/saveBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/saveBook`, bookData);
      return response.data.book;
    } catch (error) {
      console.error("Save book error:", error);
      return rejectWithValue(
        error.response?.data?.error || "Failed to save booking"
      );
    }
  }
);

// Fetch all bookings
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getBooks`);
      return response.data.books;
    } catch (error) {
      console.error("Get books error:", error);
      return rejectWithValue(
        error.response?.data?.error || "Failed to load bookings"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // saveBook cases
      .addCase(saveBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books.push(action.payload);
      })
      .addCase(saveBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getBooks cases
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
