import express from "express";
import { getHome, postLogin, postSignup } from "../controllers/controllers.js";

const router = express.Router();

router.route("/").get(getHome);
router.route("/signup").post(postSignup);
router.route("/login").post(postLogin);

export default router;
