// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/video.routes");
const {
  createCollection,
} = require("./services/vector.service");

const app = express();

createCollection()
  .then(() =>
    console.log(
      "Qdrant collection ready"
    )
  )
  .catch(console.error);
  
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CreatorJoy Backend Running"
  });
});

app.use("/api/videos", videoRoutes);

module.exports = app;