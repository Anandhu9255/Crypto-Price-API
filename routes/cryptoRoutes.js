import express from "express";
import axios from "axios";

const router = express.Router();
const API_URL = "https://api.coinstats.app/public/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "User-Agent": "Mozilla/5.0 (Render Fix)",
    Accept: "application/json",
  },
});

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
 *     summary: Get prices for top 5 cryptocurrencies
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: List of top 5 cryptocurrencies with current prices
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
    const response = await api.get("/coins?limit=5");
    const data = response.data.coins.map((coin) => ({
      coin: coin.id,
      price: coin.price,
      marketCap: coin.marketCap,
    }));
    res.json(data);
  } catch (error) {
    console.error("Prices API Error:", error.message);
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
 *         description: The cryptocurrency ID (e.g., bitcoin, ethereum)
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
 *                   example: bitcoin
 *                 price:
 *                   type: number
 *                   example: 30000.45
 *                 marketCap:
 *                   type: number
 *                   example: 580000000000
 *       404:
 *         description: Coin not found
 */
router.get("/prices/:coin", async (req, res) => {
  const { coin } = req.params;
  try {
    const response = await api.get(`/coins/${coin}`);
    if (!response.data.coin) {
      return res.status(404).json({ error: "Coin not found" });
    }
    res.json({
      coin: response.data.coin.id,
      price: response.data.coin.price,
      marketCap: response.data.coin.marketCap,
    });
  } catch (error) {
    console.error("Coin API Error:", error.message);
    res.status(404).json({ error: "Coin not found" });
  }
});

/**
 * @swagger
 * /api/top:
 *   get:
 *     summary: Get top 10 coins by market cap
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: List of top 10 cryptocurrencies by market cap
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
 *                   marketCap:
 *                     type: number
 *                     example: 580000000000
 */
router.get("/top", async (req, res) => {
  try {
    const response = await api.get("/coins?limit=10");
    const data = response.data.coins.map((coin) => ({
      coin: coin.id,
      marketCap: coin.marketCap,
    }));
    res.json(data);
  } catch (error) {
    console.error("Top Coins API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
});

export default router;
