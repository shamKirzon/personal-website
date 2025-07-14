import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API);

export default async function (req: VercelRequest, res: VercelResponse) {

 console.log("ACCESS PLSS")
  
  const {name, email, message} = req.body; 
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  try {
    const { error } = await resend.emails.send({
      from: email,
      to: ['shammysuyat@gmail.com'],
      subject: 'PERSONAL WEBSITE VISITOR',
      html: `<strong>NAME: ${name}</strong><br />
              <p>${message}</p>      
      `,
    });

    if (error) return res.status(500).json({ error });

    console.log("SUCCESS SEND EMAIL")

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
