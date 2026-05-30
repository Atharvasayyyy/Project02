const path = require("path");
const YTDlpWrap = require("yt-dlp-wrap").default;

const ytDlpPath = path.join(
  __dirname,
  "../../bin/yt-dlp.exe"
);

const ytDlpWrap = new YTDlpWrap(ytDlpPath);
const getYoutubeMetadata = async (url) => {
  try {
    const metadata = await ytDlpWrap.getVideoInfo(url);

    return {
      videoId: metadata.id,
      title: metadata.title,
      author: metadata.channel,
      views: metadata.view_count || 0,
      likes: metadata.like_count || 0,
      comments: metadata.comment_count || 0,
      duration: metadata.duration || 0,
      uploadDate: metadata.upload_date || null,
      thumbnail: metadata.thumbnail || null,
    };
  } catch (error) {
    console.error("Metadata Error:", error);
    throw error;
  }
};

module.exports = {
  getYoutubeMetadata,
};