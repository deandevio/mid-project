import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { errorHandle } from "../middleware/errorHandle.js";

export const getHome = (req, res) => res.render("home");
export const getLogin = (req, res) => res.render("login");
export const getSignup = (req, res) => res.render("signup");
export const getLogout = (req, res) => res.cookie("jwt", false, { maxAge: 1, httpOnly: true }).redirect("login");
export const getMenu = async (req, res) => {
  const { username } = req.params.username;

  try {
    const user = await User.findOne(username);
    if (user && user.transactions < 1) {
      res.render("menu");
    }
    res.redirect("/login");
  } catch (error) {}
};
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
          expiresIn: "9999999",
        }
      );
      res.cookie("jwt", token, { maxAge: 900000, httpOnly: true });
      res.status(201).json({ succuess: true, user: user.username });
    }
  } catch (error) {
    const errors = errorHandle(error);
    res.status(400).json({ errors });
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
          expiresIn: "9999999",
        }
      );
      res.cookie("jwt", token, { maxAge: 900000, httpOnly: true });
    }
    if (user.transactions < 1) {
      throw Error("Too many transactions today, come by tomorrow");
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    const errors = errorHandle(error);
    res.status(400).json({ errors });
  }
};
