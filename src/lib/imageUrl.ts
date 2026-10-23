export function toWebp(url: string | null | undefined): string {
  if (!url) return "";
  return url.replace(/\.(png|jpe?g)$/i, ".webp");
}
