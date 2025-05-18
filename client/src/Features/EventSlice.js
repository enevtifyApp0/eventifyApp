import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  events: [],
  status: "idle",
  error: null,
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
      return response.data.event;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Thunk for get events
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const response = await axios.get(`${ENV.SERVER_URL}/events`);
  return response.data;
});

// Slice for events
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
