// swagger.js
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
        url: "https://crypto-price-api-oyqm.onrender.com",
      },
    ],
  },

  // FIX: Scan ALL route files
  apis: ["./index.js", "./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
