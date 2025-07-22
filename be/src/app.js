"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatbot_route_1 = __importDefault(require("./chat-bot/chatbot.route"));
const message_route_1 = __importDefault(require("./message/message.route"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes: 
app.use("/api", chatbot_route_1.default);
app.use("/api", message_route_1.default);
exports.default = app;
