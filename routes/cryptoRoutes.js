import express from "express";
import {
  getPrices,
  getPriceByCoin,
  getTopCoins,
} from "../controllers/cryptoController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Cryptocurrency API
 */

router.get("/prices", getPrices);
router.get("/prices/:coin", getPriceByCoin);
router.get("/top", getTopCoins);

export default router;
