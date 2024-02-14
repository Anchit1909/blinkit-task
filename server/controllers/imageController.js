const Media = require("../models/imageModel");
const cloudinary = require("cloudinary").v2;

const uploadMedia = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Please upload the file" });
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "blinkit",
        resource_type: "auto",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Cloudinary Error" });
    }

    const { originalname } = req.file;
    const { secure_url } = uploadedFile;
    const userId = req.user.id;

    const media = await Media.create({
      userId: userId,
      fileName: originalname,
      mediaUrl: secure_url,
    });

    if (!media) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to upload media" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Media uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const userId = req.user.id;

    const media = await Media.find({
      userId: userId,
    });

    if (media.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You have not yet uploaded any media",
      });
    }

    return res
      .status(200)
      .json({ success: true, media: media, message: "Fetched all media" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { uploadMedia, getAllMedia };
