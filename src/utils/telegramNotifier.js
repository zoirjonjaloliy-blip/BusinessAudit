// Xavfsiz jo'natuvchi: Avval serverless /api/send-lead ga murojaat qiladi
export async function sendLeadToTelegram(leadData) {
  try {
    const res = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    if (res.ok) {
      return;
    }
  } catch (e) {
    // Agar serverless yo'q bo'lsa (masalan local yoki static hostingda) fallback ishlaydi
  }

  // Fallback (zaxira varianti)
  const TELEGRAM_BOT_TOKEN = "9044784064:AAFrfUzq4GbU1EluoLQM-zw-FaxLMJ0fKh8";
  const TELEGRAM_CHAT_ID = "397814699";
  
  try {
    const text = `🔥 <b>YANGI TADBIRKOR:</b> ${leadData.fullName} (${leadData.phone})\n🏢 <b>Biznes:</b> ${leadData.businessName}\n📊 <b>Dastur:</b> ${leadData.accountingSoftware}\n💰 <b>Yo'qotish:</b> $${leadData.monthlyWastedMoney}/oy`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });
  } catch (err) {
    console.error("Xatolik:", err);
  }
}
