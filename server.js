const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = requie("fs")

const app = express();
app.use(cors());

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

    const oldImage = req.body.oldImage;

if (oldImage) {
    try {
        const filename = path.basename(oldImage);
        const filePath = path.join(__dirname, "uploads", filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Old image deleted:", filename);
        } else {
            console.log("File not found:", filePath);
        }

    } catch (error) {
        console.log("Error deleting old image:", error.message);
    }
}

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    res.json({
        message: "Profile picture updated",
        imageUrl: `${baseUrl}/uploads/${req.file.filename}`
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});