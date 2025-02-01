import { HttpClient } from "./httpClient";
import dotenv from "dotenv";
import Search from "./Search";
dotenv.config();
export default class StocksService {
  private ticker: string;
  constructor(ticker: string) {
    this.ticker = ticker;
  }

  getTicker() {
    return this.ticker;
  }
  async getPriceAction(
    startDate: string,
    endDate: string,
    timeFrame: "day" | "week" | "month" = "day"
  ) {
    const existingSearch = await Search.findOne({
      search: this.ticker,
      start_date: startDate,
      end_date: endDate,
      timeFrame,
    });
    if (existingSearch) {
      return existingSearch.result;
    }
    const { stockData, profile } = await this.info(startDate, endDate, timeFrame);
    const companyThumbnail = await this.thumbnail();
    // Save search to database
    if (stockData && profile && companyThumbnail)
      await Search.create({
        search: this.ticker,
        start_date: startDate,
        end_date: endDate,
        timeFrame,
        result: { stockData, profile, companyThumbnail },
      });
    return { stockData, profile, companyThumbnail };
  }

  private async info(
    // Price action queries
    startDate: string,
    endDate: string,
    timeFrame: "day" | "week" | "month" = "day"
    //
  ) {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexDate.test(startDate) || !regexDate.test(endDate)) {
      throw new Error("Invalid date format");
    }
    let dstart = new Date(startDate);
    let dend = new Date(endDate);
    if (dstart > dend) {
      throw new Error("Invalid date range");
    }
    const stockData = await HttpClient.get<any>(
      `https://api.polygon.io/v2/aggs/ticker/${this.ticker.toUpperCase()}/range/1/${timeFrame}/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=A9R8HlphCFALJ5mDjI7nhoXrc7XEaOtf`
    );
    const [profile] = await HttpClient.get<any>(
      `https://financialmodelingprep.com/api/v3/profile/${this.ticker}?apikey=${process.env.COMPANY_KEY}`
    );
    return { stockData, profile };
  }

  private async thumbnail() {
    let companyThumbnail: string;
    try {
      const [{ image }] = await HttpClient.get<[{ image: string }]>(
        `https://api.api-ninjas.com/v1/logo?ticker=${this.ticker}`,
        {
          "X-Api-Key": process.env.LOGO_API_KEY!,
        }
      );
      companyThumbnail = image;
    } catch (error) {
      companyThumbnail = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
    }
    return companyThumbnail;
  }
}
