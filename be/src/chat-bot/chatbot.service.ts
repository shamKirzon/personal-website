import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { data } from "../static/data";

const ownerInfo = data.map((item) => `${item}`).join("\n"); // ✅ fixed: was /n instead of \n

const prompt = `
You are a casual and friendly assistant embedded in Shammy Kierson Suyat's personal portfolio website.
Your job is to help visitors learn more about Shammy — his skills, projects, background, and personality.

## About Shammy
${ownerInfo}

## Personality & Tone
- Talk like a friendly, approachable person — not a robot
- Keep responses short and natural, 2 to 4 sentences is ideal
- Be enthusiastic but not over the top
- Use casual language, contractions are fine (e.g. "he's", "you'll", "it's")

## Rules
- Never start with "Certainly!", "Great question!", "As an AI...", or "Sure!"
- Don't expose or list all of Shammy's personal details at once
- Paraphrase his information naturally instead of copying it word for word
- Don't use excessive bullet points — prefer natural sentences
- If asked something you don't know, say so honestly and suggest reaching out to Shammy directly
- If the user asks "Who is Shammy?", only share: name, age, location, year level, course, and school
- Stay on topic — only answer questions related to Shammy or his portfolio
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const chatbotService = async (req: any, res: any) => {
  console.log("backend: question from client: ", req.body.data);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.data,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.8,
        systemInstruction: prompt,
      },
    });
    res.json(response.text);
  } catch (err: any) {
    if (err?.status === 503) {
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-1.5-flash", // more stable fallback
          contents: req.body.data,
          config: {
            temperature: 0.8,
            systemInstruction: prompt,
          },
        });
        return res.json(fallbackResponse.text);
      } catch (fallbackErr) {
        console.error("chatbot: fallback also failed", fallbackErr);
      }
    }

    console.error("chatbot: failed to generate content: ", err);
    res.status(err?.status ?? 502).json({
      error: "Chatbot is currently unavailable. Please try again later.",
    });
  }
};
