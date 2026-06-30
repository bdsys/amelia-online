import { createSessionToken, verifySessionToken } from "@/lib/session";

const SECRET = "test-secret-key";
const ALT_SECRET = "different-secret";

describe("session tokens", () => {
  it("round-trips: created token verifies with same secret", async () => {
    const token = await createSessionToken(SECRET, 3600);
    expect(await verifySessionToken(token, SECRET)).toBe(true);
  });

  it("rejects tampered payload", async () => {
    const token = await createSessionToken(SECRET, 3600);
    const tampered = token.replace(/^\d+/, "9999999999999");
    expect(await verifySessionToken(tampered, SECRET)).toBe(false);
  });

  it("rejects expired token", async () => {
    const past = Date.now() - 1000;
    const token = await createSessionToken(SECRET, 0, past - 1); // expiry in past
    expect(await verifySessionToken(token, SECRET)).toBe(false);
  });

  it("rejects wrong secret", async () => {
    const token = await createSessionToken(SECRET, 3600);
    expect(await verifySessionToken(token, ALT_SECRET)).toBe(false);
  });

  it("rejects garbage input", async () => {
    expect(await verifySessionToken("not-a-token", SECRET)).toBe(false);
    expect(await verifySessionToken("", SECRET)).toBe(false);
  });
});
