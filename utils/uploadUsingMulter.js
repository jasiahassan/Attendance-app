const multer = require("multer");
const crypto = require("crypto");
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

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    next();
  });
};

const uploadImageToFirebase = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const randomId = crypto.randomBytes(2).toString("hex");

  const originalFilename = req.file.originalname;
  const fileExtension = originalFilename.split(".").pop();

  const newFilename = `${originalFilename}_${randomId}.${fileExtension}`;

  const storageref = ref(storage, newFilename);
  const metadata = {
    contentType: "image/*",
  };

  uploadBytes(storageref, req.file.buffer, metadata)
    .then(() => {
      getDownloadURL(storageref)
        .then((url) => {
          req.body.image = url;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = { uploadImage, uploadImageToFirebase };

// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("no file uploaded");
//   }
//   const storageref = ref(storage, req.file.originalname);
//   const metadata = {
//     contentType: "image/jpg",
//   };
//   uploadBytes(storageref, req.file.buffer, metadata).then(() => {
//     getDownloadURL(storageref)
//       .then((url) => {
//         res.send({ url });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).send(err);
//       });
//   });
// });

//
