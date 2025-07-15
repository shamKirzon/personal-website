
// for future purposes only, not completely finished yet. 

import {Resend} from "resend"
import dotenv from "dotenv"

dotenv.config(); 
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req:any, res: any) {

  if(req.method !== "POST") return res.status(405).json({error: "method not allowed"})

    const {name, email, message} = req.body; 

  try{

    // resend emailing 
      const data = await resend.emails.send({
     from: "Acme <onboarding@resend.dev>", 
      to: "youremail@example.com", 
      subject: `New Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    res.status(200).json({success: true, data})
    
  }catch(error:any){
    res.status(500).json({error: error.message || "failed to send email"})
  }

}