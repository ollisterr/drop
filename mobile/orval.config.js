module.exports = {
    petstore: {
        output: {
            mode: "tags-split",
            target: "api/petstore.ts",
            schemas: "api/model",
            client: "react-query",
            prettier: true,
        },
        input: {
            target: "../data/api-spec.json",
        },
    },
};
