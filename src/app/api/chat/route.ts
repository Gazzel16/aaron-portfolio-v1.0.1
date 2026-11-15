import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "gemini-3.8-flash";
const MAX_ATTEMPTS = 2;
const RETRY_DELAYS_MS = [400];

const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Aaron Mercado, a full-stack developer based in Metro Manila, Philippines (remote/local).

About Aaron:
- Roles: Full Stack Developer, Software Engineer
- Builds production apps end to end: React, Next.js, TypeScript, Node.js, Python (FastAPI)
- Cloud: DigitalOcean, Vercel, Supabase, Firebase; Discord alerts for commits/deploys
- Mentors student capstone teams; freelances and has corporate experience (including B1G Corporation)
- Contact: aaron.dev2898@gmail.com; LinkedIn and GitHub available on the site

Guidelines:
- Be concise, friendly, and professional
- Answer questions about Aaron's skills, experience, projects, and how to contact him
- If asked something unrelated or private you don't know, say so briefly and steer back to the portfolio
- Do not invent employers, projects, or credentials
- Keep replies under ~120 words unless the user asks for more detail`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableGeminiError(
  status: number,
  message: string | undefined,
): boolean {
  if (status === 429 || status === 503 || status === 500) return true;
  const text = (message ?? "").toLowerCase();
  return (
    text.includes("high demand") ||
    text.includes("try again later") ||
    text.includes("temporarily") ||
    text.includes("unavailable") ||
    text.includes("resource exhausted") ||
    text.includes("overloaded")
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      messages?: ChatMessage[];
    };

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const cleaned = messages
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .slice(-12);

    if (cleaned.length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const contents = cleaned.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.trim().slice(0, 2000) }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 256,
        },
    };

    let lastError = "Gemini request failed. Try again later.";

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const geminiRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await geminiRes.json();
      const message =
        typeof data?.error?.message === "string"
          ? data.error.message
          : undefined;

      if (!geminiRes.ok) {
        const retryable = isRetryableGeminiError(geminiRes.status, message);
        lastError = retryable
          ? "pls try again later"
          : (message ?? lastError);
        const canRetry = attempt < MAX_ATTEMPTS - 1 && retryable;

        if (canRetry) {
          await sleep(RETRY_DELAYS_MS[attempt] ?? 400);
          continue;
        }

        return NextResponse.json({ error: lastError }, { status: 502 });
      }

      const reply =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text ?? "")
          .join("")
          .trim() ?? "";

      if (!reply) {
        lastError = "No reply from the model.";
        if (attempt < MAX_ATTEMPTS - 1) {
          await sleep(RETRY_DELAYS_MS[attempt] ?? 1600);
          continue;
        }
        return NextResponse.json({ error: lastError }, { status: 502 });
      }

      return NextResponse.json({ reply });
    }

    return NextResponse.json({ error: lastError }, { status: 502 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
