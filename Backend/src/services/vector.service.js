const qdrantClient = require("../config/qdrant");
const { generateEmbedding } = require("./embedding.service");
const crypto = require("crypto");
const COLLECTION_NAME = "creatorjoy_videos";


const createCollection = async () => {
  const exists = await qdrantClient
    .getCollection(COLLECTION_NAME)
    .then(() => true)
    .catch(() => false);

  if (exists) {
    console.log("Collection already exists");
    return;
  }

  await qdrantClient.createCollection(
    COLLECTION_NAME,
    {
      vectors: {
        size: 384, // update after test
        distance: "Cosine",
      },
    }
  );

  console.log("Collection created");
};

const storeChunks = async (
  chunks,
  metadata
) => {
  const points = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const vector =
      await generateEmbedding(
        chunk.pageContent
      );

    points.push({
      id: crypto.randomUUID(),
      vector,
      payload: {
        text: chunk.pageContent,
        chunkIndex: i,
        ...metadata,
      },
    });
  }

  await qdrantClient.upsert(
    COLLECTION_NAME,
    {
      wait: true,
      points,
    }
  );

  return points.length;
};

module.exports = {
  createCollection,
  storeChunks,
  COLLECTION_NAME,
};