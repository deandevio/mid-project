import User from "../model/userModel.js";

export const getHome = (req, res) => {
  res.render("home");
};

export const postSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    await User.increment(user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
