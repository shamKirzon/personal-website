import {VercelRequest, VercelResponse} from "@vercel/node"
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"

dotenv.config() 

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

 export default async function handler(req: any, res:any) {

  try{
    const result = await ai.models.generateContent({
       model: "gemini-2.5-flash",
      contents: req,
    })

    const text = result.text; 

    return res.status(200).json({text})
  }catch{
    return res.status(500).json({error: "chat-bot not working properly. "})
  }
 }