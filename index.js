import express from "express";
import axios from "axios";
import cors from "cors";
import { swaggerDocs } from "./swagger.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";

const app = express();

// Enable CORS
app.use(cors());

// Render PORT
const PORT = process.env.PORT || 10000;

// Swagger
swaggerDocs(app);

// Root
app.get("/", (req, res) => {
  res.send("Crypto Price API is running");
});

// Use Routes
app.use("/api", cryptoRoutes);

// Old single endpoint (optional, can keep or remove)
const symbolToId = {
  btc: "bitcoin",
  eth: "ethereum",
  bnb: "binancecoin",
  xrp: "ripple",
  ada: "cardano",
  sol: "solana",
  dot: "polkadot",
};


app.get("/price/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const id = symbolToId[symbol];

  if (!id) {
    return res.status(400).json({ error: "Invalid symbol" });
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching price" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
