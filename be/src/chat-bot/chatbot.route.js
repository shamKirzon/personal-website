"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_service_1 = require("./chatbot.service");
const chatbotRoute = (0, express_1.Router)();
chatbotRoute.get("/chat-bot", chatbot_service_1.chatbotService);
exports.default = chatbotRoute;
