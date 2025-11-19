import { getPricesService, getPriceByCoinService, getTopCoinsService } from '../services/cryptoService.js';

// Controller for getting prices of top 5 cryptocurrencies
export const getPrices = async (req, res) => {
  try {
    const prices = await getPricesService();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
};

// Controller for getting price of a specific coin
export const getPriceByCoin = async (req, res) => {
  try {
    const { coin } = req.params;
    const price = await getPriceByCoinService(coin);
    res.json(price);
  } catch (error) {
    res.status(404).json({ error: 'Coin not found' });
  }
};

// Controller for getting top 10 coins by market cap
export const getTopCoins = async (req, res) => {
  try {
    const topCoins = await getTopCoinsService();
    res.json(topCoins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top coins' });
  }
};
