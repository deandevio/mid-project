import express from "express";
import { verifyToken } from "../middleware/isAuth.js";
import { getHome, postLogin, postSignup, getLogin, getSignup, getMenu, getLogout } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getHome);
router.route("/signup").get(getSignup).post(postSignup);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").get(getLogout);
router.route("/:username").get(verifyToken, getMenu);

export default router;
