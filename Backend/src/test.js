// testEmbedding.js

const {
  generateEmbedding,
} = require("./services/embedding.service");

(async () => {
  const vector =
    await generateEmbedding(
      "hello world"
    );

  console.log(
    "Length:",
    vector.length
  );
})();