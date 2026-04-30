import { Request, Response } from "express";
import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

const SYMBOLS = [
  "RELIANCE",
  "HDFCBANK",
  "BHARTIARTL",
  "SBIN",
  "TCS",
  "ICICIBANK",
  "INFY",
];

/** Wait for the ML service to become available, retrying up to `maxTries` times. */
async function waitForML(url: string, maxTries = 6, delayMs = 5000): Promise<void> {
  for (let i = 0; i < maxTries; i++) {
    try {
      await axios.get(`${url}/health`, { timeout: 5000 });
      return; // success
    } catch {
      if (i < maxTries - 1) {
        console.log(`[stocks] ML service not ready, retrying in ${delayMs / 1000}s... (attempt ${i + 1}/${maxTries})`);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw new Error(
    `ML service is not reachable at ${url} after ${maxTries} attempts. ` +
    `Make sure it is running: cd ml && python app.py`
  );
}

export async function getStockPrices(req: Request, res: Response) {
  try {
    await waitForML(ML_SERVICE_URL);

    const response = await axios.post(
      `${ML_SERVICE_URL}/predict/batch`,
      { symbols: SYMBOLS },
      { timeout: 180_000 } // 3 min – training 7 models in parallel can be slow first time
    );

    if (!response.data.success) {
      throw new Error(response.data.error || "ML service returned an error");
    }

    const predictions: Array<{
      symbol: string;
      name: string;
      mcap: string;
      sector: string;
      current_price: number;
      predicted_price: number;
      change_pct: number;
      is_up: boolean;
      rating: string;
    }> = response.data.data;

    res.status(200).json({
      success: true,
      data: predictions,
      errors: response.data.errors ?? [],
    });
  } catch (error: any) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      "Failed to fetch stock predictions";

    res.status(502).json({ success: false, message });
  }
}
