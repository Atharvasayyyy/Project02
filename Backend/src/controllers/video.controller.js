const {getYoutubeMetadata} = require("../services/metadata.service");

const {getYoutubeTranscript} = require("../services/transcript.service");

const processYoutubeVideo = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "Youtube URL is required",
      });
    }

    const metadata = await getYoutubeMetadata(youtubeUrl);

    const transcript = await getYoutubeTranscript(youtubeUrl);

    const engagementRate =
      ((metadata.likes + metadata.comments) /
        metadata.views) *
      100;

    return res.status(200).json({
      success: true,
      data: {
        ...metadata,
        transcript,
        engagementRate,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  processYoutubeVideo,
};


// const { getYoutubeTranscript } = require("../services/transcript.service");

// const processYoutubeVideo = async (req, res) => {
//   try {
//     const { youtubeUrl } = req.body;

//     const transcript =
//       await getYoutubeTranscript(youtubeUrl);

//     return res.json({
//       success: true,
//       transcript,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   processYoutubeVideo,
// };