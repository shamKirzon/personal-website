import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY); 


export default async (req: any, res: any) => {
  
    if (req.method !== "POST") {
    return req.status(400).json({ error: "Only POST method allowed" });
  }


   const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });


};
