import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes";
import stocksRoutes from "./routes/stocks.routes";

import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env.local') }); // Will pick up .env if present

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/stocks", stocksRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
