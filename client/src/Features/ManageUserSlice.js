import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

// تعريف initialState
const initialState = {
  allUsers: [], // مصفوفة لتخزين المستخدمين
  status: "idle", // حالة الطلب (idle, loading, succeeded, failed)
  iserror: null, // لتخزين أي خطأ
};

// Thunk for get Users
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getUsers`);
    return response.data.users;
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
});

//Thunk for delete api
export const deleteUser = createAsyncThunk(
  "manageUser/deleteUser",
  async (id) => {
    try {
      const response = await axios.delete(`${ENV.SERVER_URL}/deleteUser/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

// إنشاء slice لإدارة حالة المستخدمين
export const manageUserSlice = createSlice({
  name: "allUsers", //name of the state
  initialState, // initial value of the state
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder
      // get user
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })

      //delete
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reset } = manageUserSlice.actions;

export default manageUserSlice.reducer;
