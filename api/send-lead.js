// Vercel Serverless Function: Bot tokeni faqat Vercel Environment Variables dan olinadi
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Tokenlar maxfiy ravishda Vercel Environment Variables dan olinadi
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Telegram sozlamalari (env) o\'rnatilmagan' });
  }

  const leadData = req.body;

  const softwareStatus = leadData.accountingSoftware === 'software'
    ? "✅ Dastur bor (POS / 1C / Tizim)"
    : leadData.accountingSoftware === 'excel'
    ? "⚠️ Excelda yuritadi"
    : "🚨 DAFTARDA ISHLAYDI (Zudlik bilan dastur kerak!)";

  const debtStatus = leadData.debtTracking === 'software'
    ? "✅ Dasturda nazoratda"
    : leadData.debtTracking === 'paper'
    ? "⚠️ Qarz daftari bor (Qo'lda)"
    : "🚨 Umuman hisobsiz (Xavfli)";

  const inventoryStatusText = leadData.inventoryStatus === 'accurate'
    ? "✅ Qoldiqlar aniq"
    : leadData.inventoryStatus === 'estimated'
    ? "⚠️ Taxminiy biladi"
    : "🚨 Omborda oylab tovar muzlab yotibdi (Nelikvid)";

  const fiscalStatusText = leadData.fiscalMarking === 'automated'
    ? "✅ To'liq qonuniy (1C/POS)"
    : leadData.fiscalMarking === 'partial'
    ? "⚠️ Qisman (qo'lda uriladi)"
    : "🚨 Tizimlashmagan (Jarima xavfi yuqori!)";

  const abcStatusText = leadData.abcAnalysisStatus === 'automated'
    ? "✅ Dasturda avtomatik ABC-tahlil bor"
    : leadData.abcAnalysisStatus === 'approximate'
    ? "⚠️ Taxminan ko'zda chamalaydi (+12% yo'qotish)"
    : "🚨 ABC-tahlil yo'q / Nelikvid muzlagan (+25% jarima)";

  const financialReportsText = leadData.financialReportsStatus === 'full_reports'
    ? "✅ P&L, Cash Flow va Balans har oy shakllanadi"
    : leadData.financialReportsStatus === 'cash_only'
    ? "⚠️ Faqat kassa yuritiladi (Balans yo'q)"
    : "🚨 Moliyaviy ko'rlik (Kassadagi pulni foyda deb biladi)";

  const aiStatusText = leadData.aiUsageStatus === 'integrated'
    ? "✅ 1C/POS ga AI va Telegram bot ulangan"
    : leadData.aiUsageStatus === 'basic_chat'
    ? "⚠️ AI ni faqat oddiy chatda ishlatadi"
    : "🚨 AI analitika ishlatilmaydi";

  const isPitchNeeded = leadData.abcAnalysisStatus !== 'automated' || leadData.financialReportsStatus !== 'full_reports';
  const autoPitchBlock = isPitchNeeded
    ? `\n💡 <b>SOTUV UCHUN ZOIRJONGA PODSKAZKA (AUTO-PITCH):</b>\n🎯 <i>Mijozga qo'ng'iroq qilganda oddiy kassa haqida emas, balki 1C orqali omboridagi $${(leadData.deadStockSum || leadData.deadStockCGroup || 0).toLocaleString()} nelikvid tovarlarni aniqlab berish va Telegramiga har kechqurun AI-Balans tahliliy xulosasini chiqarib berishni taklif qiling!</i>\n`
    : '';

  const message = `
🔥 <b>YANGI TADBIRKOR AUDITI! (PRO 4.0 AI & CFO Dossier)</b>
━━━━━━━━━━━━━━━━━
👤 <b>Ismi:</b> ${leadData.fullName || "Noma'lum"}
🏢 <b>Biznes nomi:</b> ${leadData.businessName || "Kiritilmagan"}
📞 <b>Telefon:</b> <code>${leadData.phone || "—"}</code>
📍 <b>Shahar/Hudud:</b> ${leadData.city || "Ko'rsatilmagan"}

📊 <b>BIZNES VA DASTUR HOLATI:</b>
• <b>Sohasi:</b> ${leadData.industry?.name || "Savdo"}
• <b>Hisob-kitob tizimi:</b> ${softwareStatus}
• <b>Qarzlar / Nasiya:</b> ${debtStatus}
• <b>Ombor / Nelikvid:</b> ${inventoryStatusText}
• <b>Soliq & Markirovka:</b> ${fiscalStatusText}
• <b>Mijozlar bazasi (CRM):</b> ${leadData.hasCrm === 'yes' ? "Bor" : "Yo'q"}
• <b>Bonus / Loyallik tizimi:</b> ${leadData.loyaltySystem === 'automated' ? "Avtomatlashgan" : leadData.loyaltySystem === 'verbal' ? "Og'zaki chegirma" : "Yo'q"}
• <b>Sotuv jamoasi:</b> ${leadData.salesTeam === 'owner_only' ? "Egasi o'zi sotadi" : "Menejerlar bor"}

🧠 <b>PRO 4.0 BOSHQARUV ANALITIKASI VA AI:</b>
• <b>ABC / XYZ Tahlil:</b> ${abcStatusText}
• <b>Balans & P&L hisoboti:</b> ${financialReportsText}
• <b>AI & Telegram Analitika:</b> ${aiStatusText}
• <b>Auto-Ordering (Min-Max):</b> ${leadData.autoOrderingStatus === 'automated' ? "Avtomatik" : "Out-of-Stock xavfi bor (8-12% yo'qotish)"}

💰 <b>MOLIYAVIY RENTGEN RAQAMLARI:</b>
• <b>Oylik maqsad:</b> $${leadData.targetRevenue?.toLocaleString() || 0}
• <b>O'rtacha chek:</b> $${leadData.averageCheck || 0}
• <b>Doimiy xarajatlar:</b> $${leadData.fixedCosts?.toLocaleString() || 0}/oy
• ⚠️ <b>Umumiy oylik zarar:</b> $${(leadData.totalMonthlyLoss || leadData.monthlyWastedMoney)?.toLocaleString() || 0} /oy ($${(leadData.totalYearlyLoss || leadData.yearlyWastedMoney)?.toLocaleString() || 0} /yil)
  ↳ <i>Yo'qotilgan sof foyda:</i> $${leadData.lostNetProfitMonthly?.toLocaleString() || 0}/oy
  ↳ <i>Reklama behuda ketishi:</i> $${leadData.monthlyWastedMarketing?.toLocaleString() || 0}/oy
  ↳ <i>Kamomad/o'g'irlik:</i> $${leadData.inventoryShrinkLossMonthly?.toLocaleString() || 0}/oy
  ↳ <i>Out-of-Stock (Talab yo'qotish):</i> $${leadData.outOfStockLossMonthly?.toLocaleString() || 0}/oy
• 🧊 <b>Ombordagi muzlagan tovar (Nelikvid):</b> $${leadData.deadStockSum?.toLocaleString() || 0}
• 📋 <b>Nasiya daftari xavfi:</b> $${leadData.estimatedDebtRiskSum?.toLocaleString() || 0}
• 📅 <b>Zararsizlik kuni:</b> Oyning ${leadData.breakEvenDay || 1}-kuni
• ⏱️ <b>Operatsionka vaqti:</b> ${leadData.yearlyOpHours || 0} soat/yil ($${leadData.yearlyTimeCost?.toLocaleString() || 0} tadbirkor vaqti qiymati)
• 🏥 <b>Salomatlik balli:</b> ${leadData.scores?.overall}/100 (Boshqaruv/BI: ${leadData.scores?.bi || 50}/100)
${autoPitchBlock}
━━━━━━━━━━━━━━━━━
👉 <a href="tel:${leadData.phone}">Mijozga qo'ng'iroq qilish</a>
👉 <a href="https://t.me/${leadData.phone?.replace(/[^0-9]/g, '')}">Telegramda yozish</a>
  `.trim();

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Telegram API xatosi:", err);
    return res.status(500).json({ error: 'Telegramga yuborishda xatolik yuz berdi' });
  }
}
