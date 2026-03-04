const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
        message: "File uploaded successfully",
        imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});