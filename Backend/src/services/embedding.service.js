const { pipeline } = require("@xenova/transformers");

let embedder = null;

const getEmbedder = async () => {
  if (!embedder) {
    console.log("Loading embedding model...");

    embedder = await pipeline(
      "feature-extraction",
      "Xenova/bge-small-en-v1.5"
    );

    console.log("Embedding model loaded");
  }

  return embedder;
};

const generateEmbedding = async (text) => {
  const extractor = await getEmbedder();

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

module.exports = {
  generateEmbedding,
};