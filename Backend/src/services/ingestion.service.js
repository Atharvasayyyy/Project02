const {
  chunkTranscript,
} = require("./chunking.service");

const {
  storeChunks,
} = require("./vector.service");

const ingestVideo = async (
  transcript,
  metadata
) => {
  const chunks =
    await chunkTranscript(
      transcript
    );

  const count =
    await storeChunks(
      chunks,
      metadata
    );

  return {
    chunksCreated: chunks.length,
    vectorsStored: count,
  };
};

module.exports = {
  ingestVideo,
};