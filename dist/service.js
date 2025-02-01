"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = require("./httpClient");
const dotenv_1 = __importDefault(require("dotenv"));
const Search_1 = __importDefault(require("./Search"));
dotenv_1.default.config();
class StocksService {
    constructor(ticker) {
        this.ticker = ticker;
    }
    getTicker() {
        return this.ticker;
    }
    getPriceAction(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (startDate, endDate, timeFrame = "day") {
            const { stockData, profile } = yield this.info(startDate, endDate, timeFrame);
            const companyThumbnail = yield this.thumbnail();
            // Save search to database
            if (stockData && profile && companyThumbnail)
                yield Search_1.default.create({
                    search: this.ticker,
                    result: { stockData, profile, companyThumbnail },
                });
            return { stockData, profile, companyThumbnail };
        });
    }
    info(startDate_1, endDate_1) {
        return __awaiter(this, arguments, void 0, function* (
        // Price action queries
        startDate, endDate, timeFrame = "day"
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
            const stockData = yield httpClient_1.HttpClient.get(`https://api.polygon.io/v2/aggs/ticker/${this.ticker.toUpperCase()}/range/1/${timeFrame}/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=A9R8HlphCFALJ5mDjI7nhoXrc7XEaOtf`);
            const [profile] = yield httpClient_1.HttpClient.get(`https://financialmodelingprep.com/api/v3/profile/${this.ticker}?apikey=${process.env.COMPANY_KEY}`);
            return { stockData, profile };
        });
    }
    thumbnail() {
        return __awaiter(this, void 0, void 0, function* () {
            let companyThumbnail;
            try {
                const [{ image }] = yield httpClient_1.HttpClient.get(`https://api.api-ninjas.com/v1/logo?ticker=${this.ticker}`, {
                    "X-Api-Key": process.env.LOGO_API_KEY,
                });
                companyThumbnail = image;
            }
            catch (error) {
                companyThumbnail = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
            }
            return companyThumbnail;
        });
    }
}
exports.default = StocksService;
