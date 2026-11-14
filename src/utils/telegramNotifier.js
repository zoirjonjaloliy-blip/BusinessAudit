// Frontend faqat serverless API ga murojaat qiladi, kodda hech qanday token qolmaydi
export async function sendLeadToTelegram(leadData) {
  try {
    const res = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    if (!res.ok) {
      console.warn("API xabar yuborishda javob bermadi:", res.status);
    }
  } catch (err) {
    console.error("Lid yuborishda xatolik:", err);
  }
}
