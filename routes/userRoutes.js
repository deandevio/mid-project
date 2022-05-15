import express from "express";
import { verifyToken } from "../middleware/isAuth.js";
import { getHome, postLogin, postSignup, getLogin, getSignup, getDashboard } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getHome);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(postLogin);
router.route("/dashboard").get(verifyToken, getDashboard);

export default router;
