import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Price API",
      version: "1.0.0",
      description: "API for fetching real-time cryptocurrency prices",
    },
    servers: [
      {
        url: process.env.PORT
          ? `https://crypto-price-api-oyqm.onrender.com`
          : "http://localhost:10000",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // ← parse all JS files in routes
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
