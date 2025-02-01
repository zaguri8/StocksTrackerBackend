"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.SearchSchema = new mongoose_1.default.Schema({
    search: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    result: {
        type: Object,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Search", exports.SearchSchema);
