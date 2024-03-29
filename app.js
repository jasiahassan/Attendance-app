const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const AttendanceRouter = require("./routes/AttendanceRoutes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const { initializeApp } = require("firebase/app");
require("./controllers/seeding");
const uploadPhotos = require("./utils/uploadUsingMulter");

dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful"));

const firebaseConfig = {
  apiKey: "AIzaSyAvNhucRxF6jT0B5iUOAVHmiW7yVsan9Bk",
  authDomain: "attendance-app-90eb5.firebaseapp.com",
  projectId: "attendance-app-90eb5",
  storageBucket: "attendance-app-90eb5.appspot.com",
  messagingSenderId: "17104516802",
  appId: "1:17104516802:web:0e31f7f5a95c51f94fad5b",
};
exports.firebaseapp = initializeApp(firebaseConfig);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/attendance", AttendanceRouter);

const multer = require("multer");

const router = express.Router();
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");

initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer({
  storage: multer.memoryStorage(),
});
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("no file uploaded");
  }
  const storageref = ref(storage, req.file.originalname);
  const metadata = {
    contentType: "image/jpg",
  };
  uploadBytes(storageref, req.file.buffer, metadata).then(() => {
    getDownloadURL(storageref)
      .then((url) => {
        res.send({ url });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log(`app running on port 3000...`);
});

module.exports = app;
