// Qdrant configuration
const { QdrantClient } = require("@qdrant/js-client-rest");

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333",
});

module.exports = qdrantClient;