export const WHATSAPP_PHONE = "+79899024352";

export function getWhatsAppLink(message?: string): string {
  const baseUrl = "https://wa.me/79898024352";
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  return baseUrl;
}

export function openWhatsApp(message?: string): void {
  const link = getWhatsAppLink(message);
  window.open(link, "_blank");
} 