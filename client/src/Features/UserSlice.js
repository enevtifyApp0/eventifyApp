import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// ✅ Thunk: تسجيل مستخدم جديد
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    const response = await axios.post("http://localhost:3001/registerUser", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  }
);

// ✅ Thunk: تسجيل الدخول
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  } catch (error) {
    alert("Invalid credentials");
    throw new Error("Invalid credentials");
  }
});

// ✅ Thunk: تسجيل الخروج
export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post("http://localhost:3001/logout");
});

// ✅ Thunk: تحديث الملف الشخصي (بما في ذلك الصورة)
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async (userData) => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("password", userData.password);
      if (userData.profilePic) {
        formData.append("profilePic", userData.profilePic);
      }

      const response = await axios.put(
        `http://localhost:3001/updateUserProfile/${userData.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.user;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.value.find((u) => u.email === action.payload.email);
      if (user) {
        user.name = action.payload.name;
        user.password = action.payload.password;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {};
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // ✅ Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
