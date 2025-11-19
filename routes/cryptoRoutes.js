import express from 'express';
import { getPrices, getPriceByCoin, getTopCoins } from '../controllers/cryptoController.js';

const router = express.Router();

// Route to get prices for top 5 cryptocurrencies
router.get('/prices', getPrices);

// Route to get price for a specific coin
router.get('/prices/:coin', getPriceByCoin);

// Route to get top 10 coins by market cap
router.get('/top', getTopCoins);

export default router;
