const { getYoutubeMetadata } = require("../services/metadata.service");
const { getYoutubeTranscript } = require("../services/transcript.service");
const { ingestVideo } = require("../services/ingestion.service");

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
      metadata.views > 0
        ? ((metadata.likes + metadata.comments) /
            metadata.views) *
          100
        : 0;

    // Store transcript in Qdrant
    const result = await ingestVideo(
      transcript,
      {
        videoId: metadata.videoId,
        title: metadata.title,
        creator: metadata.author,
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        ...metadata,
        engagementRate,
        chunksCreated: result.chunksCreated,
        vectorsStored: result.vectorsStored,
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