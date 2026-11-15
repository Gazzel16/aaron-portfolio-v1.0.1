import { NextResponse } from "next/server";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "aaron.dev2898@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "aaron.dev2898@gmail.com";
const FROM_NAME = process.env.CONTACT_FROM_NAME ?? "Aaron Portfolio";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Add BREVO_API_KEY." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: FROM_NAME,
          email: FROM_EMAIL,
        },
        to: [{ email: TO_EMAIL, name: "Aaron Mercado" }],
        replyTo: { email, name },
        subject: `Portfolio inquiry from ${name}`,
        textContent: [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        htmlContent: `
          <div style="font-family: Georgia, serif; color: #1c2430; line-height: 1.6;">
            <p style="text-transform: uppercase; letter-spacing: 0.16em; font-size: 12px; color: #5c6b5e;">
              Portfolio · Correspondence
            </p>
            <h2 style="margin: 8px 0 16px;">New message from ${escapeHtml(name)}</h2>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <hr style="border: none; border-top: 1px solid #d6dbd4; margin: 20px 0;" />
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;
      return NextResponse.json(
        { error: err?.message || "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
