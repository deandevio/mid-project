import express from "express";
import { getHome } from "../controllers/controllers.js";

const router = express.Router();

router.route("/").get(getHome);

export default router;
