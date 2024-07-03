import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// routers
import authRouter from "./src/routes/authRouter.js";
import vehicleBrandRouter from "./src/routes/vehicleBrandRouter.js";
import vehicleTypeRouter from "./src/routes/vehicleTypeRouter.js";

// middleware
import errorHandlerMiddleware from "./src/middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./src/middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicle-brand", authenticateUser, vehicleBrandRouter);
app.use("/api/v1/vehicle-type", authenticateUser, vehicleTypeRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
