const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

require("./controllers/seeding");
dotenv.config({ path: "./config.env" });
mongoose
  .connect("mongodb://0.0.0.0:27017/attendance")
  .then(() => console.log("DB connection successful"));

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
app.listen(3000, () => {
  console.log(`app running on port 8000...`);
});

module.exports = app;
