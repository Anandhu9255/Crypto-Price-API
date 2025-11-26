import express from "express";
import axios from "axios";

const router = express.Router();

const API_URL = "https://api.coinstats.app/public/v1";

// Axios instance with required headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "User-Agent": "Mozilla/5.0 (Render Fix)",
    "Accept": "application/json"
  },
});

// 🔹 GET top 5 prices
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

// 🔹 GET price for specific coin
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

// 🔹 GET top 10 by market cap
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
