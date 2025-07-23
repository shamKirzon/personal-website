import { Router } from "express"; 
import { chatbotService } from "./chatbot.service";



const chatbotRoute = Router(); 

chatbotRoute.post("/chat-bot", chatbotService)


export default chatbotRoute; 