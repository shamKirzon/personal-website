import {Router} from "express"
import { messageService } from "./message.service";

const messageRoute = Router(); 

messageRoute.get("message", messageService )

export default messageRoute; 