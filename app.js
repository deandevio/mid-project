import express from "express";
import { dbConnect } from "./config/db.js";
import "dotenv/config";
import router from "./routes/routes.js";
import session from "express-session";

const app = express();

dbConnect();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
