export const TELEGRAM_PHONE = "+79899024352";

export function getTelegramLink(message?: string): string {
  const baseUrl = "https://t.me/79899024352";
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  return baseUrl;
}

export function openTelegram(message?: string): void {
  const link = getTelegramLink(message);
  window.open(link, "_blank");
} 