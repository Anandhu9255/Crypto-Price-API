import express from "express";
import axios from "axios";
import { swaggerDocs } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 10000;

swaggerDocs(app);

app.get("/", (req, res) => {
  res.send("Crypto Price API is running");
});

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
  const symbol = req.params.symbol;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching price" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
