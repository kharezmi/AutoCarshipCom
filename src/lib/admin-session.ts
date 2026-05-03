import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "acs_blog_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function getSecret(): string | null {
  const s = process.env.BLOG_ADMIN_SECRET?.trim();
  return s && s.length >= 16 ? s : null;
}

export function createAdminSessionToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error("BLOG_ADMIN_SECRET is not set (min 16 characters).");
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf-8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const secret = getSecret();
  if (!secret) return false;
  const i = token.lastIndexOf(".");
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as {
      exp?: number;
    };
    if (typeof data.exp !== "number" || Date.now() > data.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const c = await cookies();
  return verifyAdminSessionToken(c.get(COOKIE)?.value);
}

export async function setAdminSessionCookie(token: string) {
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearAdminSessionCookie() {
  const c = await cookies();
  c.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export { COOKIE as ADMIN_SESSION_COOKIE };
