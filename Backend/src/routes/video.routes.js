const express = require("express");

const {
  processYoutubeVideo,
} = require("../controllers/video.controller");

const router = express.Router();

router.post("/process", processYoutubeVideo);

module.exports = router;