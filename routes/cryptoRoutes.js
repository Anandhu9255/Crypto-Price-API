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

router.get("/prices", async (req, res) => {
  try {
    const response = await api.get("/coins?limit=5");
    const coins = response.data?.coins || [];
    const data = coins.map((coin) => ({
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

router.get("/prices/:coin", async (req, res) => {
  const { coin } = req.params;
  try {
    const response = await api.get(`/coins/${coin}`);
    const c = response.data?.coin;
    if (!c) return res.status(404).json({ error: "Coin not found" });

    res.json({
      coin: c.id,
      price: c.price,
      marketCap: c.marketCap,
    });
  } catch (error) {
    console.error("Coin API Error:", error.message);
    res.status(404).json({ error: "Coin not found" });
  }
});

router.get("/top", async (req, res) => {
  try {
    const response = await api.get("/coins?limit=10");
    const coins = response.data?.coins || [];
    const data = coins.map((coin) => ({
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
