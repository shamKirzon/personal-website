import chatbotRoute from "./chat-bot/chatbot.route";
import messageRoute from "./message/message.route"

import express from "express"
import cors from "cors"



const app = express(); 
app.use(express.json()); 
app.use(cors())



//routes: 
app.use("/api", chatbotRoute)
app.use("/api", messageRoute)



export default app; 