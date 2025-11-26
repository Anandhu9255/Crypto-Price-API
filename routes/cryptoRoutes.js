import express from "express";
import axios from "axios";

const router = express.Router();
const API_URL = "https://api.coingecko.com/api/v3";

/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Cryptocurrency price endpoints
 */

/**
 * @swagger
 * /api/prices:
 *   get:
 *     summary: Get top 5 cryptocurrencies with current price
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: List of top 5 cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   coin:
 *                     type: string
 *                     example: bitcoin
 *                   price:
 *                     type: number
 *                     example: 30000.45
 *                   marketCap:
 *                     type: number
 *                     example: 580000000000
 */
router.get("/prices", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/coins/markets`,
      { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 5, page: 1 } }
    );
    const data = response.data.map((coin) => ({
      coin: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
    }));
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

/**
 * @swagger
 * /api/prices/{coin}:
 *   get:
 *     summary: Get price for a specific cryptocurrency
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency ID (e.g., bitcoin, ethereum)
 *     responses:
 *       200:
 *         description: Price details for the requested coin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coin:
 *                   type: string
 *                 price:
 *                   type: number
 *                 marketCap:
 *                   type: number
 *       404:
 *         description: Coin not found
 */
router.get("/prices/:coin", async (req, res) => {
  const { coin } = req.params;
  try {
    const response = await axios.get(
      `${API_URL}/coins/markets`,
      { params: { vs_currency: "usd", ids: coin } }
    );
    if (!response.data.length) return res.status(404).json({ error: "Coin not found" });
    const c = response.data[0];
    res.json({
      coin: c.id,
      price: c.current_price,
      marketCap: c.market_cap,
    });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: "Coin not found" });
  }
});

/**
 * @swagger
 * /api/top:
 *   get:
 *     summary: Get top 10 cryptocurrencies by market cap
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: List of top 10 cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   coin:
 *                     type: string
 *                   marketCap:
 *                     type: number
 */
router.get("/top", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/coins/markets`,
      { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10, page: 1 } }
    );
    const data = response.data.map((coin) => ({
      coin: coin.id,
      marketCap: coin.market_cap,
    }));
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
});

export default router;
