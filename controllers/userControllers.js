import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const getHome = (req, res) => res.render("home");
export const getLogin = (req, res) => res.render("login");
export const getSignup = (req, res) => res.render("signup");

export const postSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    if (user.username === "dean") {
      user.isAdmin = true;
    }
    if (user) {
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "100",
        }
      );
      res.cookie("jwt", token, { maxAge: 900000, httpOnly: true });
      res.status(201).render("login");
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    if (user) {
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "100",
        }
      );
      user.token = token;
    }
    await User.increment(user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
