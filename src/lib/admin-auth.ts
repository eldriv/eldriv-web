/**
 * Admin auth helpers — runs in both the Node runtime (route handlers) and the
 * Edge runtime (middleware) by using only Web Crypto + standard primitives.
 */

export const ADMIN_COOKIE_NAME = "eldriv_admin";
const TOKEN_VERSION = "v1";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const textEncoder = new TextEncoder();

const getAuthSecret = (): string => {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_AUTH_SECRET must be set to a random string of at least 16 characters."
    );
  }
  return secret;
};

const getAdminPassword = (): string => {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return password;
};

const toBase64Url = (buffer: ArrayBuffer | Uint8Array): string => {
  const bytes =
    buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const fromBase64Url = (value: string): Uint8Array => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  const binary = atob(padded + "=".repeat(padding));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const importHmacKey = async (secret: string): Promise<CryptoKey> =>
  crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i];
  return result === 0;
};

type Payload = {
  v: typeof TOKEN_VERSION;
  /** Issued-at, in seconds since epoch. */
  iat: number;
  /** Expires-at, in seconds since epoch. */
  exp: number;
};

export const signAdminToken = async (
  ttlSeconds: number = DEFAULT_TTL_SECONDS
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);
  const payload: Payload = {
    v: TOKEN_VERSION,
    iat: now,
    exp: now + ttlSeconds,
  };
  const payloadBytes = textEncoder.encode(JSON.stringify(payload));
  const key = await importHmacKey(getAuthSecret());
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${toBase64Url(payloadBytes)}.${toBase64Url(signature)}`;
};

export const verifyAdminToken = async (
  token: string | null | undefined
): Promise<boolean> => {
  if (!token) return false;
  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) return false;

  let payloadBytes: Uint8Array;
  let signatureBytes: Uint8Array;
  try {
    payloadBytes = fromBase64Url(encodedPayload);
    signatureBytes = fromBase64Url(encodedSignature);
  } catch {
    return false;
  }

  let secret: string;
  try {
    secret = getAuthSecret();
  } catch {
    return false;
  }

  const key = await importHmacKey(secret);
  const expected = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, payloadBytes)
  );
  if (!constantTimeEqual(expected, signatureBytes)) return false;

  let payload: Payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as Payload;
  } catch {
    return false;
  }

  if (payload.v !== TOKEN_VERSION) return false;
  if (typeof payload.exp !== "number") return false;
  if (Math.floor(Date.now() / 1000) >= payload.exp) return false;
  return true;
};

/**
 * Constant-time-ish password check. Both strings are HMAC'd before comparison
 * so the comparison itself doesn't leak character-by-character timing.
 */
export const isCorrectPassword = async (
  candidate: string | null | undefined
): Promise<boolean> => {
  if (!candidate) return false;
  const expected = getAdminPassword();
  const key = await importHmacKey(getAuthSecret());
  const candidateMac = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, textEncoder.encode(candidate))
  );
  const expectedMac = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, textEncoder.encode(expected))
  );
  return constantTimeEqual(candidateMac, expectedMac);
};

export const cookieSerializationOptions = {
  name: ADMIN_COOKIE_NAME,
  ttlSeconds: DEFAULT_TTL_SECONDS,
} as const;
