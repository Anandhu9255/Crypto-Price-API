import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        url: process.env.BASE_URL || "http://localhost:10000",
      },
    ],
  },
  apis: ["./routes/cryptoRoutes.js"], // Swagger annotations are in routes
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
