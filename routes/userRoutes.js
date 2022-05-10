import express from "express";
import { verifyToken } from "../middleware/isAuth.js";
import { getHome, postLogin, postSignup } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getHome);
router.route("/signup").post(postSignup);
router.route("/login").post(verifyToken, postLogin);

export default router;
