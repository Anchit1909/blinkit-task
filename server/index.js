const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Database is connected"))
  .catch((error) => {
    console.error(error);
  });

app.use(cors());

app.get("/", (req, res) => {
  res.send("Connection Established");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/image", require("./routes/imageRoutes"));

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
