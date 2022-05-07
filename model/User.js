import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [10, "Name can not be more than 10 characters"],
    minlength: [4, "Name can not  be less than 4 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be 8 minimum characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactions: Number,
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
