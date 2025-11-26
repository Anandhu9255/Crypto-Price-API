import {
  getPricesService,
  getPriceByCoinService,
  getTopCoinsService,
} from "../services/cryptoService.js";

export const getPrices = async (req, res) => {
  try {
    const prices = await getPricesService();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prices" });
  }
};

export const getPriceByCoin = async (req, res) => {
  try {
    const { coin } = req.params;
    const price = await getPriceByCoinService(coin);
    res.json(price);
  } catch (error) {
    res.status(404).json({ error: "Coin not found" });
  }
};

export const getTopCoins = async (req, res) => {
  try {
    const coins = await getTopCoinsService();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
};
