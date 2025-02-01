import express from "express";
import { HttpClient } from "./httpClient";
import dotenv from "dotenv";
import StocksService from "./service";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/stock_info/:symbol", async (req, res) => {
  try {
    const { start_date, end_date, timeFrame } = req.query as any;
    const service = new StocksService(req.params.symbol);
    const data = await service.getPriceAction(start_date, end_date, timeFrame);
    
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({
      message: "Error fetching stock data",
      error: error.message,
    });
  }
});
export default app;
