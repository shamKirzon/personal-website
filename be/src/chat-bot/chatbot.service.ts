import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { data } from "../static/data";



const baseInstruction = `You are a helpful assistant that answers only questions 
about your owner, Shammy Kierson Suyat. Use the following information when 
replying:\n\n`;
const ownerInfo = data.map((item) => `${item}`).join("/n");
const fallback = `
You are a chatbot trained by Shammy. Respond naturally and appropriately.

Guidelines:
- Paraphrase Shammy’s information in your own words when answering.
- Do not list or expose the full set of Shammy’s personal details.
- Always respond based on the user's intent, avoiding scripted or repetitive replies unless truly necessary.
- If the user asks "Who is Shammy?", provide only the basic information:
  - Name
  - Age
  - Where Shammy lives
  - Current year level in college
  - College course
  - Name of college or school
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
