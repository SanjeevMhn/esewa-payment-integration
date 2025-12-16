
export function generateUniqueId() {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 0)}`;
}

export function base64Decode(base64: string) {
  if (!base64) {
    return null;
  }

  try {
    const standardBase64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(standardBase64);
    return JSON.parse(decoded);
  } catch (err: any) {
    console.error("Error decoding base64 string");
    return null;
  }
}
