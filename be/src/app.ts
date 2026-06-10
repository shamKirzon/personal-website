import chatbotRoute from "./chat-bot/chatbot.route";
import messageRoute from "./message/message.route";

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", chatbotRoute);
app.use("/api", messageRoute);

// health - for uptime robot setup - to avoid server cold start.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

export default app;
