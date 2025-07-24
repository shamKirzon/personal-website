import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const messageService = async (req: any, res: any) => {
  const { name, email, message } = req.body.data;


 const { data, error } = await resend.emails.send({
  from: `Personal Website <onboarding@resend.dev>`,
  to: ['shammysuyat@gmail.com'],
  subject: 'Visitor Message',
 html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <h2 style="color: #4a90e2;">New Visitor Message</h2>

    <p><strong style="color: #333;">Name:</strong> <span style="color: #555;">${name}</span></p>
    <p><strong style="color: #333;">Email:</strong> <span style="color: #555;">${email}</span></p>
    <p><strong style="color: #333;">Message:</strong></p>
    <p style="color: #444; background-color: #ffffff; padding: 10px; border-left: 4px solid #4a90e2;">
      ${message}
    </p>

    <hr style="margin: 20px 0;" />
    <p style="color: #888;">This message was submitted via your personal website's contact form.</p>
  </div>
`

});

if (error) {
  return console.error('Email send error:', error);
}


  res.json("THIS IS FROM THE BACKEND", data);
};
