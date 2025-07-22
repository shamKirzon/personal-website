"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_service_1 = require("./message.service");
const messageRoute = (0, express_1.Router)();
messageRoute.get("message", message_service_1.messageService);
exports.default = messageRoute;
