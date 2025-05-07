import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import bookReducer from "../Features/BookSlice";
import eventReducer from "../Features/EventSlice"; // إضافة EventSlice

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: bookReducer,
    events: eventReducer, // إضافة الـ reducer للأحداث
  },
});
