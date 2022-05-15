import express from "express";
import { verifyToken } from "../middleware/isAuth.js";
import { getHome, postLogin, postSignup, getLogin, getSignup } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getHome);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(verifyToken, postLogin);

export default router;
