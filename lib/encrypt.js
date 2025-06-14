const encoder = new TextEncoder();
const key = new TextEncoder().encode("top-secret");

// Hash function with key-based encryption
export const hash = async (plainPassword) => {
  const passwordData = encoder.encode(plainPassword);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );

  const hashBuffer = await crypto.subtle.sign("HMAC", cryptoKey, passwordData);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Compare function using key
export const compare = async (plainPassword, encryptedPassword) => {
  const hashedPassword = await hash(plainPassword);
  return hashedPassword === encryptedPassword;
};
