import express from "express";
import axios from "axios";
import cors from "cors";
import { swaggerDocs } from "./swagger.js";

const app = express();

// Enable CORS for Swagger & frontend
app.use(cors());

// Required for Render
const PORT = process.env.PORT || 10000;

// Initialize Swagger
swaggerDocs(app);

app.get("/", (req, res) => {
  res.send("Crypto Price API is running");
});

// Map ticker → CoinGecko ID
const symbolToId = {
  btc: "bitcoin",
  eth: "ethereum",
  bnb: "binancecoin",
  xrp: "ripple",
  ada: "cardano",
  sol: "solana",
  dot: "polkadot",
};

/**
 * @openapi
 * /price/{symbol}:
 *   get:
 *     summary: Get crypto price
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: BTC
 *     responses:
 *       200:
 *         description: Price data returned
 */
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
