import { Resend } from "resend";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUEST_BYTES = 12_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function isValidEmail(value: string) {
  return value.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown-client";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = requestLog.get(key);
  if (!current || current.resetAt <= now) {
    requestLog.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: Math.ceil(WINDOW_MS / 1000) };
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
}

function jsonError(message: string, status: number, retryAfter?: number) {
  const headers = new Headers({ "Cache-Control": "no-store" });
  if (retryAfter) headers.set("Retry-After", String(retryAfter));
  return Response.json({ error: message }, { status, headers });
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) return jsonError("That message is too large.", 413);

  const rate = checkRateLimit(getClientKey(req));
  if (!rate.allowed) return jsonError("Too many messages. Please try again later.", 429, rate.retryAfter);

  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).length > MAX_REQUEST_BYTES) return jsonError("That message is too large.", 413);

  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  if (body.website) return jsonError("Invalid request.", 400);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || !email || !message) return jsonError("Name, email, and message are all required.", 400);
  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) return jsonError("Please shorten the name or message and try again.", 400);
  if (!isValidEmail(email)) return jsonError("That email address looks invalid.", 400);

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) return jsonError("Contact service is temporarily unavailable.", 503);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio contact form <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });
    if (error) {
      console.error("Contact email delivery failed", { nameLength: name.length });
      return jsonError("Couldn't send that message. Try again in a moment.", 502);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Contact route failed");
    return jsonError("Couldn't send that message. Try again in a moment.", 500);
  }
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
