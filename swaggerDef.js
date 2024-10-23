module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "A simple CRUD API for managing todos.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Todo: {
        type: "object",
        required: ["title", "content"],
        properties: {
          id: {
            type: "string",
            description: "The auto-generated id of the todo",
          },
          title: {
            type: "string",
            description: "The title of the todo",
          },
          content: {
            type: "string",
            description: "The content of the todo",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "The creation date of the todo",
          },
        },
      },
    },
  },
  paths: {}, // This will be populated by swagger-jsdoc
};
