"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to database");
})
    .catch((error) => {
    console.log("Error connecting to database");
    console.log(error);
});
exports.default = db;
