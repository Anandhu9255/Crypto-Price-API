import express from "express";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import { swaggerDocs } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Swagger
swaggerDocs(app);

// Root route
app.get("/", (req, res) => {
  res.send("Crypto Price API is running");
});

// Routes
app.use("/api", cryptoRoutes);

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
