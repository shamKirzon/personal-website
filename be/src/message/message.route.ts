import { Router } from "express";
import { messageService } from "./message.service";

const messageRoute = Router(); 

messageRoute.post("/message", messageService)

export default messageRoute