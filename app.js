import express from "express";
import { dbConnect } from "./config/db.js";
import "dotenv/config";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

dbConnect();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
