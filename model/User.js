import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

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
  transactions: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.statics.increment = async function (userId) {
  const transactions = await User.findByIdAndUpdate(userId, { $inc: { transactions: 1 } }, { new: true, upsert: true });
  return transactions.seq;
};

userSchema.statics.login = async function (username, password) {
  const user = await User.findOne({ username });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Bad password");
  }
  throw Error("Username does not exist");
};

const User = mongoose.model("User", userSchema);

export default User;
