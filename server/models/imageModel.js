const mongoose = require("mongoose");
const { Schema } = mongoose;
const MediaSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    fileName: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("media", MediaSchema);
