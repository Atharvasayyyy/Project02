const {
  RecursiveCharacterTextSplitter,
} = require("@langchain/textsplitters");

const chunkTranscript = async (
  transcript
) => {
  const splitter =
    new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

  const chunks =
    await splitter.createDocuments([
      transcript,
    ]);

  return chunks;
};

module.exports = {
  chunkTranscript,
};