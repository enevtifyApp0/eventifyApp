import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  status: "idle", // حالة لتتبع الطلب
  error: null, // لتخزين أي خطأ
};

// Thunk لإضافة حدث
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (eventData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/addEvent",
        eventData
      );
      return response.data.event; // إرجاع الحدث الجديد إلى Redux
    } catch (error) {
      console.error(error);
      throw error; // إعادة طرح الخطأ للتعامل معه في الحالة rejected
    }
  }
);

// Thunk لجلب الأحداث
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const response = await axios.get("http://localhost:3001/events");
  return response.data; // إرجاع قائمة الأحداث
});

// إنشاء Slice للأحداث
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = "loading"; // تعيين الحالة إلى التحميل
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload); // إضافة الحدث الجديد إلى القائمة
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading"; // تعيين الحالة إلى التحميل
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload; // تحديث قائمة الأحداث
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});

// تصدير الـ reducer
export default eventSlice.reducer;
