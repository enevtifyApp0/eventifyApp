import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  status: 'idle', // حالة لتتبع الطلب
  error: null, // لتخزين أي خطأ
};

// Thunk لحفظ الكتاب
export const saveBook = createAsyncThunk(
  "book/saveBook",
  async (bookData) => {
    try {
      const response = await axios.post("http://localhost:3001/saveBook", bookData);
      return response.data.book; // إرجاع الكتاب الجديد إلى Redux
    } catch (error) {
      console.error(error);
      throw error; // إعادة طرح الخطأ للتعامل معه في الحالة rejected
    }
  }
);

// Thunk لجلب الكتب
export const getBooks = createAsyncThunk("book/getBooks", async () => {
  try {
    const response = await axios.get("http://localhost:3001/getBooks");
    return response.data.books; // إرجاع الكتب إلى Redux
  } catch (error) {
    console.error(error);
    throw error; // إعادة طرح الخطأ للتعامل معه في الحالة rejected
  }
});

// إنشاء Slice للكتب
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books.push(action.payload); // إضافة الكتاب الجديد إلى القائمة
      })
      .addCase(saveBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(getBooks.pending, (state) => {
        state.status = "loading"; // تعيين الحالة إلى التحميل
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload; // تحديث القائمة بالكتب المسترجعة
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});

export default bookSlice.reducer;