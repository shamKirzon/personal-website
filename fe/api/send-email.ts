import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['shammysuyat@gmail.com'],
      subject: 'Hello from Serverless!',
      html: '<strong>It works!</strong>',
    });

    if (error) return res.status(500).json({ error });

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
