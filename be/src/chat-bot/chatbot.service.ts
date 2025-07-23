import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { data } from "../static/data";



const baseInstruction = `You are a helpful assistant that answers only questions 
about your owner, Shammy Kierson Suyat. Use the following information when 
replying:\n\n`;
const ownerInfo = data.map((item) => `${item}`).join("/n");
const fallback = `
If the question is unrelated to Shammy, respond with:
 EDI DAPAT SA GOOGLE KA NAG SEARCH, KITA MONG MERON LANG AKONG LIMITED TOKEN PER DAY.

If the question is about Shammy but the answer is not in the list, respond with:
 Hmm, looks like Shammy didn’t mention that.

 If the input is a command (e.g., starts with a verb or sounds like an instruction), respond in a respectful and slightly playful tone with:

"Sorry! I'm just a chatbot trained by Shammy to answer questions about him — I can't follow commands or perform tasks."
`;


const prompt = baseInstruction + ownerInfo + fallback

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const chatbotService = async (req: any, res: any) => {
  console.log("backend: question from client: ", req.body.data)

  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.body.data,
    config: {
      thinkingConfig: {
        thinkingBudget:0
      },
      systemInstruction: prompt,
    },
  });

  res.json(response.text);
};
