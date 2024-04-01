const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const AttendanceRouter = require("./routes/AttendanceRoutes");
const leavesRouter = require("./routes/leavesRouter");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
require("./controllers/seeding");

dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful"));

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/attendance", AttendanceRouter);
app.use("/leaves", leavesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log(`app running on port 3000...`);
});

module.exports = app;
