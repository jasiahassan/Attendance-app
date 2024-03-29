const multer = require("multer");
const express = require("express");
const router = express.Router();
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAvNhucRxF6jT0B5iUOAVHmiW7yVsan9Bk",
  authDomain: "attendance-app-90eb5.firebaseapp.com",
  projectId: "attendance-app-90eb5",
  storageBucket: "attendance-app-90eb5.appspot.com",
  messagingSenderId: "17104516802",
  appId: "1:17104516802:web:0e31f7f5a95c51f94fad5b",
};

initializeApp(firebaseConfig);
const storage = getStorage();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const storageRef = ref(storage, `files/${req.file.originalname}`);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image!please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
});
router.post("./upload", upload.single("image")),
  (req, res) => {
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
  };
