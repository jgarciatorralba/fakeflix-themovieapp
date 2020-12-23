// Import native node modules
import path from "path";

// Import dependencies
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/img/user/",
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype === "image/jpeg" || file.mimetype === "image/png");
};

export default multer({ storage, limits, fileFilter });
