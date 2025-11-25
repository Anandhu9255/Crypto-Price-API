import express from 'express';
import { getPrices, getPriceByCoin, getTopCoins } from '../controllers/cryptoController.js';

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
router.get('/prices', getPrices);

/**
 * @swagger
 * /api/prices/{coin}:
 *   get:
 *     summary: Get price for a specific cryptocurrency
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: coin
 *         schema:
 *           type: string
 *         required: true
 *         description: The cryptocurrency symbol (e.g., bitcoin, ethereum)
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
router.get('/prices/:coin', getPriceByCoin);

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
router.get('/top', getTopCoins);

export default router;
