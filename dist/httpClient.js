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
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.HttpClient = {
    get(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, headers = {}) {
            const request = axios_1.default.get(url, {
                headers: Object.assign({ Connection: "close" }, headers),
                timeout: 10000,
            });
            return request.then((response) => response.data);
        });
    },
    post(url_1, body_1) {
        return __awaiter(this, arguments, void 0, function* (url, body, headers = {}) {
            const request = axios_1.default.post(url, body, {
                headers: Object.assign({ Connection: "close" }, headers),
                timeout: 10000,
            });
            return request.then((response) => response.data);
        });
    },
};
