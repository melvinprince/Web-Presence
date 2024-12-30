const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Import the fs module


// console.log("fileUpload.js Triggered");
// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// console.log("fileUpload.js", upload);

// Delete image function
const deleteImage = (req, res, imageName) => {
  const imagePath = `uploads/${imageName}`;
  console.log("Deleting image:", imagePath);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Failed to delete image" }); 

      // You might want to handle the error (e.g., throw it or log it)
    } else {
      console.log("Image deleted successfully!");
       return res.status(200).json({ message: "Image deleted successfully", ok: true }); 

    }
  });
};

module.exports = { upload, deleteImage };
