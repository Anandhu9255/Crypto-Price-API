import express from "express";
import {
  getPricesService,
  getPriceByCoinService,
  getTopCoinsService,
} from "../services/cryptoService.js";

const router = express.Router();

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
 *         description: List of top 5 cryptocurrencies
 */
router.get("/prices", async (req, res) => {
  try {
    const prices = await getPricesService();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

/**
 * @swagger
 * /api/prices/{coin}:
 *   get:
 *     summary: Get price for a specific coin
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price details for a coin
 *       404:
 *         description: Coin not found
 */
router.get("/prices/:coin", async (req, res) => {
  try {
    const price = await getPriceByCoinService(req.params.coin);
    res.json(price);
  } catch (err) {
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
 *         description: Top 10 coins
 */
router.get("/top", async (req, res) => {
  try {
    const topCoins = await getTopCoinsService();
    res.json(topCoins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
});

export default router;
