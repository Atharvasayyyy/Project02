const { YoutubeTranscript } = require("youtube-transcript");

const getYoutubeTranscript = async (url) => {
  try {
    console.log("Fetching transcript for:", url);

    const transcript =
      await YoutubeTranscript.fetchTranscript(url);

    console.log("Transcript fetched");

    return transcript.map((item) => item.text).join(" ");
  } catch (error) {
    console.error("TRANSCRIPT ERROR:");
    console.error(error);

    throw error;
  }
};

module.exports = {
  getYoutubeTranscript,
};