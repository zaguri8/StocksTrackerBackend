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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_1 = __importDefault(require("./service"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/stock_info/:symbol", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start_date, end_date, timeFrame } = req.query;
        const service = new service_1.default(req.params.symbol);
        const data = yield service.getPriceAction(start_date, end_date, timeFrame);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching stock data",
            error: error.message,
        });
    }
}));
exports.default = app;
