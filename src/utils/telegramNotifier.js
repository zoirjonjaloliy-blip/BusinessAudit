// Telegram Bot orqali Zoirjon Jalolovga yangi lidlarni yuborish xizmati
const TELEGRAM_BOT_TOKEN = "9044784064:AAFrfUzq4GbU1EluoLQM-zw-FaxLMJ0fKh8";
const TELEGRAM_CHAT_ID = "397814699";

export async function sendLeadToTelegram(leadData) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const softwareStatus = leadData.accountingSoftware === 'software'
    ? "✅ POS / 1C Dastur bor"
    : leadData.accountingSoftware === 'excel'
    ? "⚠️ Excelda yuritadi"
    : "🚨 DAFTARDA ISHLAYDI (POS dastur o'rnatish zarur!)";

  const debtStatus = leadData.debtTracking === 'software'
    ? "✅ Dasturda"
    : leadData.debtTracking === 'paper'
    ? "⚠️ Qarz daftari bor (Qo'lda)"
    : "🚨 Umuman hisobsiz (Xavfli)";

  const message = `
🔥 <b>YANGI TADBIRKOR AUDITI! (POS / 1C Mijoz)</b>
━━━━━━━━━━━━━━━━━
👤 <b>Ismi:</b> ${leadData.fullName || "Noma'lum"}
🏢 <b>Biznes nomi:</b> ${leadData.businessName || "Kiritilmagan"}
📞 <b>Telefon:</b> <code>${leadData.phone || "—"}</code>
📍 <b>Shahar/Hudud:</b> ${leadData.city || "Ko'rsatilmagan"}

📊 <b>BIZNES VA DASTUR HOLATI:</b>
• <b>Sohasi:</b> ${leadData.industry?.name || "Savdo"}
• <b>Kassa/Ombor:</b> ${softwareStatus}
• <b>Qarzlar (Nasiya):</b> ${debtStatus}
• <b>Mijozlar bazasi (CRM):</b> ${leadData.hasCrm === 'yes' ? "Bor" : "Yo'q"}
• <b>Sotuv jamoasi:</b> ${leadData.salesTeam === 'owner_only' ? "Egasi o'zi sotadi" : "Menejerlar bor"}

💰 <b>MOLIYAVIY RAQAMLAR:</b>
• <b>Oylik maqsad:</b> $${leadData.targetRevenue?.toLocaleString()}
• <b>O'rtacha chek:</b> $${leadData.averageCheck}
• ⚠️ <b>Oylik yo'qotish (Zarar):</b> $${leadData.monthlyWastedMoney?.toLocaleString()} /oyiga
• 🏥 <b>Salomatlik balli:</b> ${leadData.scores?.overall}/100 (${leadData.riskLevel})

━━━━━━━━━━━━━━━━━
👉 <a href="tel:${leadData.phone}">Mijozga qo'ng'iroq qilish</a>
👉 <a href="https://t.me/${leadData.phone?.replace(/[^0-9]/g, '')}">Telegramda yozish</a>
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("Telegram API xatosi:", data);
    }
  } catch (error) {
    console.error("Telegramga yuborishda xatolik yuz berdi:", error);
  }
}

