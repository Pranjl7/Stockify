import { Router } from "express";
import { getStockPrices } from "../controllers/stocks.controller";

const router = Router();

// GET /api/stocks/prices
router.get("/prices", getStockPrices);

export default router;
