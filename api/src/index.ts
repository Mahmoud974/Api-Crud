import express, { Request, Response } from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const request = require("supertest");
dotenv.config();
connectDB();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/post.routes"));

const swaggerOptions = {
  definition: {
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
          properties: {
            title: {
              type: "string",
              example: "Test Todo",
            },
            content: {
              type: "string",
              example: "This is a test todo",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-09-20T12:00:00Z",
            },
          },
          required: ["title", "content"],
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"], // Chemin vers les fichiers de routes TypeScript
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

export default app;
