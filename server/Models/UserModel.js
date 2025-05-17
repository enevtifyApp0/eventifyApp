import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  userType: {
    type: String,
    default: "user",
  },
});

const UserModel = mongoose.model("usersinfo", UserSchema);

export default UserModel;
