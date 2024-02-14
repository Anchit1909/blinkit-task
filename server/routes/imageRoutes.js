const router = require("express").Router();
const { uploadMedia, getAllMedia } = require("../controllers/imageController");
const verifyToken = require("../middlewares/verifyAuthMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({});
let upload = multer({ storage });

router.post("/uploadmedia", upload.single("myFile"), verifyToken, uploadMedia);
router.get("/getall", verifyToken, getAllMedia);

module.exports = router;
