module.exports = {
  petstore: {
    output: {
      mode: "tags-split",
      target: "api/petstore.ts",
      schemas: "api/model",
      client: "react-query",
      mock: true,
    },
    input: {
      target: "../data/api-schema.yaml",
    },
  },
};
