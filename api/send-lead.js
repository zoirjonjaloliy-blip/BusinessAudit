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

  const isPharmacy = leadData.industry?.id === 'pharmacy' || leadData.industry === 'pharmacy';
  const isClinic = leadData.industry?.id === 'clinic_medical' || leadData.industry === 'clinic_medical';

  let specialIndustryTag = "";
  if (isPharmacy) {
    specialIndustryTag = `\n💊 <b>MAXSUS SOHA: DORIXONA & APTEKA!</b>\n• Srok godnosti nazorati: ${leadData.pharmacyExpiryTracking === 'automated' ? 'Avtomat' : '⚠️ Qo\'lda (spisaniya xavfi bor)'}\n• Blister bo\'linishi: ${leadData.pharmacyBlisterSplit === 'automated' ? 'Avtomat' : '⚠️ Qo\'lda chamalanadi'}\n`;
  } else if (isClinic) {
    specialIndustryTag = `\n🏥 <b>MAXSUS SOHA: XUSUSIY KLINIKA & TIBBIYOT!</b>\n• Kassa intizomi: ${leadData.clinicCashBypass === 'strict_cashier' ? 'Shaffof kassa' : '🚨 Kassa chetlab o\'tish xavfi yuqori (20-35% zarar!)'}\n• Reaktiv sarfi: ${leadData.clinicMaterialSpisanie === 'automated' ? 'Avtomat spisaniya' : '⚠️ Umumiy olinadi (isrof xavfi)'}\n`;
  }

  const fraudStatus = leadData.fraudVoidPermission === 'cashier_allowed'
    ? "🚨 KASSIR BEKOR QILA OLADI ('Soxta vozvrat' xavfi!)"
    : "✅ Faqat rahbar ruxsati bilan";

  const isPitchNeeded = isPharmacy || isClinic || leadData.abcAnalysisStatus !== 'automated' || leadData.financialReportsStatus !== 'full_reports';
  const autoPitchBlock = isPitchNeeded
    ? `\n💡 <b>SOTUV UCHUN BDM MUTAXASSISIGA PODSKAZKA (AUTO-PITCH):</b>\n🎯 <i>${
        isPharmacy ? "Mijozga 1C: Dorixona orqali srok godnosti tugayotgan dorilarni FIFO bo'yicha sotish va 1 pachkani blisterga bo'lishda kamomadni yo'qotishni taklif qiling!" :
        isClinic ? "Mijozga 1C: Tibbiyot orqali elektron navbat o'rnatib, shifokor cho'ntagiga pul ketishini to'xtatish va yo'llanma beruvchi (napravitel) vrachlar keshbekini avtomatlashtirishni taklif qiling!" :
        "Mijozga 1C orqali omboridagi nelikvid tovarlarni aniqlab berish, kassa bekor qilishlarini Telegramga qizil signal qilib chiqarish va AI-Balans hisobotini taklif qiling!"
      }</i>\n`
    : '';

  const message = `
🔥 <b>YANGI TADBIRKOR BIZNES TAHLILI! (BiznesTahlili.uz PRO 5.0)</b>
━━━━━━━━━━━━━━━━━
👤 <b>Ismi:</b> ${leadData.fullName || "Noma'lum"}
🏢 <b>Biznes nomi:</b> ${leadData.businessName || "Kiritilmagan"}
📞 <b>Telefon:</b> <code>${leadData.phone || "—"}</code>
📍 <b>Shahar/Hudud:</b> ${leadData.city || "Ko'rsatilmagan"}
${specialIndustryTag}
📊 <b>BIZNES VA DASTUR HOLATI:</b>
• <b>Sohasi:</b> ${leadData.industry?.name || "Savdo"}
• <b>Hisob-kitob tizimi:</b> ${softwareStatus}
• <b>Qarzlar / Nasiya:</b> ${debtStatus}
• <b>Ombor / Nelikvid:</b> ${inventoryStatusText}
• <b>Soliq & Markirovka:</b> ${fiscalStatusText}
• <b>Mijozlar bazasi (CRM):</b> ${leadData.hasCrm === 'yes' ? "Bor" : "Yo'q"}
• <b>Bonus / Loyallik tizimi:</b> ${leadData.loyaltySystem === 'automated' ? "Avtomatlashgan" : leadData.loyaltySystem === 'verbal' ? "Og'zaki chegirma" : "Yo'q"}

🛡️ <b>ANTI-FRAUD & XAVFSIZLIK:</b>
• <b>Chek bekor qilish (Otmena):</b> ${fraudStatus}
• <b>Tarozi integratsiyasi:</b> ${leadData.fraudScaleIntegration === 'direct_integrated' ? 'Avtomat ulangan' : 'Qo\'lda teriladi'}
• <b>Prixod ustamasi:</b> ${leadData.fraudPriceEntry === 'manager_office' ? 'Ofis kiritadi' : 'Kassir kiritadi'}

👥 <b>UNIT-PRODUCTIVITY & FOT:</b>
• <b>Xodimlar:</b> ${leadData.employeesCount || "—"} nafar ($${(leadData.revenuePerEmployee || 0).toLocaleString()} /xodim)
• <b>FOT ulushi:</b> ${leadData.fotRatioPercent || "—"}% ${leadData.isFotHigh ? "⚠️ (Shtat xarajati yuqori!)" : "✅ (Me'yorda)"}
• <b>Maydon:</b> ${leadData.businessAreaSqM || "—"} kv.m ($${(leadData.revenuePerSqM || 0).toLocaleString()} /kv.m)
• <b>Maksimal Chegirma Limiti:</b> ${leadData.maxAllowedDiscountPercent || 0}% dan oshmasligi shart
${leadData.isCreditDangerous ? "🚨 <b>KREDIT XAVFI:</b> Hozirgi holatda kredit olish xavfli (marja past yoki nelikvid katta)!\n" : ""}
💰 <b>MOLIYAVIY RENTGEN RAQAMLARI:</b>
• <b>Oylik maqsad:</b> $${leadData.targetRevenue?.toLocaleString() || 0}
• <b>O'rtacha chek:</b> $${leadData.averageCheck || 0}
• <b>Doimiy xarajatlar:</b> $${leadData.fixedCosts?.toLocaleString() || 0}/oy
• ⚠️ <b>Umumiy oylik zarar:</b> $${(leadData.totalMonthlyLoss || leadData.monthlyWastedMoney)?.toLocaleString() || 0} /oy ($${(leadData.totalYearlyLoss || leadData.yearlyWastedMoney)?.toLocaleString() || 0} /yil)
  ↳ <i>Yo'qotilgan sof foyda:</i> $${leadData.lostNetProfitMonthly?.toLocaleString() || 0}/oy
  ↳ <i>Reklama behuda ketishi:</i> ${leadData.isSarafanOnly ? "$0 (Faqat sarafan)" : `$${leadData.monthlyWastedMarketing?.toLocaleString() || 0}/oy`}
  ↳ <i>Kamomad/o'g'irlik:</i> $${leadData.inventoryShrinkLossMonthly?.toLocaleString() || 0}/oy
  ↳ <i>Out-of-Stock (Talab yo'qotish):</i> $${leadData.outOfStockLossMonthly?.toLocaleString() || 0}/oy
• ⏱️ <b>Pul Aylanish Sikli (CCC):</b> ${leadData.cccTotalDays || 30} kun (15 kunga qisqartirilsa +$${(leadData.cashFreedUp15Days || 0).toLocaleString()} bo'shaydi)
• 🧊 <b>Ombordagi muzlagan tovar (Nelikvid):</b> $${leadData.deadStockSum?.toLocaleString() || 0}
• 📅 <b>Zararsizlik kuni:</b> Oyning ${leadData.breakEvenDay || 1}-kuni
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
