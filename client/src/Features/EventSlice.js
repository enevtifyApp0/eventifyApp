import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  events: [],
  status: "idle", // Status to track order
  error: null, //  To store any error
};

// Thunk to add or create new event
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (eventData) => {
    try {
      const response = await axios.post(
        `${ENV.SERVER_URL}/addEvent`,
        eventData
      );
      return response.data.event; // Return the new event to Redux
    } catch (error) {
      console.error(error);
      throw error; //If rejected the error message is displayed
    }
  }
);

//Thunk for get events
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const response = await axios.get(`${ENV.SERVER_URL}/events`);
  return response.data; // إرجاع قائمة الأحداث
});

// Slice for events
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = "loading"; // status is loading
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload); // add new event
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store error message
      })
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
