module.exports = {
  petstore: {
    output: {
      mode: "tags-split",
      target: "api/petstore.ts",
      schemas: "api/model",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./api/axios.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "../data/api-spec.json",
    },
  },
};
