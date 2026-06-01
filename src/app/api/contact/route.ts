import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to:      process.env.GMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family:monospace;background:#040404;color:#E8E8E0;padding:32px;border-left:3px solid #00D4FF">
        <p style="color:#00D4FF;font-size:11px;letter-spacing:0.2em;margin-bottom:20px">> PORTFOLIO · NEW_MESSAGE</p>
        <p><span style="color:#3F3F3A">FROM   //</span> ${name}</p>
        <p><span style="color:#3F3F3A">EMAIL  //</span> <a href="mailto:${email}" style="color:#00FF94">${email}</a></p>
        <hr style="border:none;border-top:1px solid #1a1a1a;margin:20px 0"/>
        <p style="white-space:pre-wrap;line-height:1.7">${message}</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
