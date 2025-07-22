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
exports.chatbotService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genai_1 = require("@google/genai");
const data_1 = require("../static/data");
const baseInstruction = `You are a helpful assistant that answers only questions 
about your owner, Shammy Kierson Suyat. Use the following information when 
replying:\n\n`;
const ownerInfo = data_1.data.map((item) => `${item}`).join("/n");
const fallback = `
If the question is unrelated to Shammy, respond with:
 EDI DAPAT SA GOOGLE KA NAG SEARCH, KITA MONG MERON LANG AKONG LIMITED TOKEN PER DAY.

If the question is about Shammy but the answer is not in the list, respond with:
 Hmm, looks like Shammy didn’t mention that.

 If the input is a command (e.g., starts with a verb or sounds like an instruction), respond in a respectful and slightly playful tone with:

"Sorry! I'm just a chatbot trained by Shammy to answer questions about him — I can't follow commands or perform tasks."
`;
const prompt = baseInstruction + ownerInfo + fallback;
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const chatbotService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "generate me a website",
        config: {
            thinkingConfig: {
                thinkingBudget: 0
            },
            systemInstruction: prompt,
        },
    });
    res.json(response.text);
});
exports.chatbotService = chatbotService;
