// HMAC-SHA256 session token: "<expiry-unix-ms>.<base64url-hmac>"
// The HMAC covers the expiry string so the token is tamper-evident.

const ENC = new TextEncoder();

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    ENC.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toBase64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(s: string): ArrayBuffer {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

export async function createSessionToken(
  secret: string,
  ttlSeconds: number,
  now: number = Date.now(),
): Promise<string> {
  const expiry = String(now + ttlSeconds * 1000);
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, ENC.encode(expiry));
  return `${expiry}.${toBase64url(sig)}`;
}

export async function verifySessionToken(
  token: string,
  secret: string,
  now: number = Date.now(),
): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot < 1) return false;
    const expiry = token.slice(0, dot);
    const sigB64 = token.slice(dot + 1);
    const expiryMs = Number(expiry);
    if (!Number.isFinite(expiryMs) || now > expiryMs) return false;
    const key = await importKey(secret);
    return await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64url(sigB64),
      ENC.encode(expiry),
    );
  } catch {
    return false;
  }
}
