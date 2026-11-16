// Sohaviy benchmarklar va PRO 5.0 Texnik Arxitektura (Hardware & Software)
export const INDUSTRY_BENCHMARKS = {
  pharmacy: {
    id: 'pharmacy',
    name: "Dorixona va Farmatsevtika (Chakana Apteka & Optom ombor)",
    category: "farmatsevtika",
    icon: 'Pill',
    avgCpl: { instagram: 1.0, telegram: 0.5, google: 1.2, tiktok: 0.4 },
    avgConversion: 65,
    avgCheck: 9,
    avgMargin: 24,
    typicalFixedCosts: 1800,
    typicalInventory: 32000,
    typicalEmployees: 4,
    typicalAreaSqM: 45,
    autoInvestCost: 1100,
    dio: 28,
    dso: 4,
    dpo: 22,
    softwareTip: "1C: Dorixona (Аптека) yoki ixtisoslashgan Apteka-POS + 2D Asl Belgisi skaneri, seriyali srok godnosti va blister bo'lish moduli.",
    tip: "Dorixonada muddati o'tgan dorilar spisaniyasi va 1 pachkani bo'lib sotishda peresort kamomadi asosiy o'g'ri hisoblanadi.",
    benchmarks: [
      { name: "Sof foyda marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "18-24%", top10: "28-32%", note: "TOP-10% dorixonalar yuqori marjali parafarmatsevtika va BAA/vitaminlar hisobiga 30%+ marja oladi." },
      { name: "Muddati o'tgan dori spisaniyasi", userValue: "<0.4%", marketAvg: "2.5-4%", top10: "<0.2%", note: "Dastur muddati 3-6 oy qolgan dorilarni qizil signal bilan sotuvga chiqarmasa, katta zarar keltiriladi." },
      { name: "Ombor tovar aylanishi (DIO)", userValue: "30 kun", marketAvg: "35 kun", top10: "20-25 kun", note: "A-toifa lokomotiv dorilar tez aylanib, 'o'lik' dorilar aylanmani band qilmasligi kerak." },
      { name: "Up-sell / Cross-sell konversiyasi", userValue: "25%", marketAvg: "15%", top10: "45%+", note: "Provizor har bir antibiotik yoniga probiotik yoki vitamin taklif qilishi o'rtacha chekni 22% ga oshiradi." }
    ],
    hardwareChecklist: [
      { id: 'pos_terminal', name: "Sensorli POS-monoblok (Tezkor provizor kassa ekrani)", essential: true },
      { id: 'scanner_2d', name: "2D Asl Belgisi va MXIK DataMatrix skaneri (Dori qutisidagi kodni o'qish uchun)", essential: true },
      { id: 'receipt_printer', name: "80mm tezkor kassa chek printeri", essential: true },
      { id: 'cash_drawer', name: "Avtomatik metall pul qutisi", essential: true },
      { id: 'thermo_hygrometer', name: "Elektron termogigrometr (Dori saqlash haroratini nazorat qilish)", essential: true },
      { id: 'ups', name: "UPS zaxira quvvatlagich (Muzlatgich va kassa uchun)", essential: false }
    ],
    rules: [
      "Seriyali hisob: har bir partiya kirganda muddati (srok godnosti) kiritilsin va dastur FIFO qoidasi bo'yicha eng avval muddati tugaydiganini sotuvga chiqarsin.",
      "1 pachka dorini plastinka (blister) yoki dona qilib sotganda qoldiq avtomat 0.1/0.5 bo'lib kamayishi shart, aks holda reviziyada doimiy kamomad chiqadi.",
      "Asl Belgisi markirovkali dorilarni soliq chekiga faqat 2D skaner orqali chiqarishni ta'minlang."
    ]
  },
  clinic_medical: {
    id: 'clinic_medical',
    name: "Xususiy Klinika, Stomatologiya va Diagnostika markazi",
    category: "tibbiyot",
    icon: 'Hospital',
    avgCpl: { instagram: 3.2, telegram: 1.8, google: 4.5, tiktok: 1.5 },
    avgConversion: 32,
    avgCheck: 45,
    avgMargin: 40,
    typicalFixedCosts: 4200,
    typicalInventory: 10000,
    typicalEmployees: 8,
    typicalAreaSqM: 120,
    autoInvestCost: 1600,
    dio: 18,
    dso: 3,
    dpo: 15,
    softwareTip: "1C: Tibbiyot / Klinika CRM + Elektron navbat, EMR (Elektron tibbiy karta), Shifokor & Napravitel keshbek hisobi.",
    tip: "Klinikada 'Kassa chetlab o'tilishi' (vrach cho'ntagiga to'lov) va reaktivlar isrofi tushumning 20-35% gacha yo'qolishiga sabab bo'ladi.",
    benchmarks: [
      { name: "Shifokor xonasi bandligi", userValue: "60%", marketAvg: "55%", top10: "85%+", note: "Onlayn yozilish va SMS eslatmalar shifokorlarning bo'sh turib qolish vaqtini 70% ga qisqartiradi." },
      { name: "Bemor qaytish darajasi (LTV/Recall)", userValue: "40%", marketAvg: "35%", top10: "75%+", note: "Profilaktik ko'riklar va tahlil javoblarini Telegramga yuborish bemorlar qaytishini kafolatlaydi." },
      { name: "Reaktiv va tibbiy sarf normasi", userValue: "18%", marketAvg: "20-25%", top10: "<12%", note: "Har bir muolajaga (shprits, reaktiv, plomba) qat'iy tex-karta kiritilib, avtomat hisobdan chiqariladi." },
      { name: "Sof rentabellik marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "30-35%", top10: "48%+", note: "Laboratoriya va diagnostika xizmatlarining to'g'ri unit-iqtisodiyoti hisobiga erishiladi." }
    ],
    hardwareChecklist: [
      { id: 'reception_pc', name: "Resepshn va Registratura uchun tezkor kompyuter", essential: true },
      { id: 'queue_screen', name: "Kutish zali uchun Elektron Navbat ekrani va kassa chek printeri", essential: true },
      { id: 'doctor_tablets', name: "Shifokor xonalari uchun EMR planshetlari/noutbuklari", essential: true },
      { id: 'lab_integration', name: "Laboratoriya analizatorlari bilan 1C to'g'ridan-to'g'ri integratsiya", essential: true },
      { id: 'cash_drawer', name: "Markaziy kassa pul qutisi", essential: true }
    ],
    rules: [
      "Bemor shifokor xonasiga faqat markaziy kassa cheki yoki elektron navbat kodi bilan kirishi shart — bu vrach cho'ntagiga pul ketishini 100% to'xtatadi.",
      "Tashqi yo'llanma beruvchi (napravitel) shifokorlar bonusini dastur orqali shaffof hisoblab, har hafta hisobot bering.",
      "Tahlil javoblarini qog'ozda emas, klinika Telegram boti orqali bemorning shaxsiy kabinetiga avtomat jo'nating."
    ]
  },
  retail_food: {
    id: 'retail_food',
    name: "Oziq-ovqat savdosi, Supermarket & Minimarket",
    category: "savdo",
    icon: 'Apple',
    avgCpl: { instagram: 0.6, telegram: 0.4, google: 1.2, tiktok: 0.4 },
    avgConversion: 35,
    avgCheck: 15,
    avgMargin: 18,
    typicalFixedCosts: 1800,
    typicalInventory: 15000,
    autoInvestCost: 950,
    softwareTip: "1C: Chakana savdo (Розница) yoki ixtisoslashgan Kassa POS tizimi + Asl Belgisi markirovka moduli.",
    tip: "Oziq-ovqatda tovar aylanmasi tezligi va tez buziluvchi tovarlar yaroqlilik muddatini avtomat nazorat qilish shart.",
    benchmarks: [
      { name: "Sof foyda marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "15-18%", top10: "22%+", note: "TOP-10% do'konlar to'g'ridan-to'g'ri ishlab chiqaruvchilar bilan ishlash hisobiga yuqori marja oladi." },
      { name: "Ombor tovar aylanishi", userValue: "35 kun", marketAvg: "35 kun", top10: "14-18 kun", note: "Tez buziluvchi tovarlar yaroqliligini saqlash uchun tovarlar 18 kundan tez aylanishi shart." },
      { name: "Kassa kamomadi normasi", userValue: "<0.8%", marketAvg: "<0.5%", top10: "<0.1%", note: "Shtrix-kod va kassa intizomi orqali kamomadni amalda nolga tushirish mumkin." },
      { name: "Qayta xarid darajasi (LTV)", userValue: "60%", marketAvg: "65%", top10: "85%+", note: "Doimiy xaridorlar oylik umumiy kassa tushumining asosiy 80% qismini keltiradi." }
    ],
    hardwareChecklist: [
      { id: 'pos_terminal', name: "Sensorli POS-monoblok (15.6 dyuymli kassa ekrani)", essential: true },
      { id: 'scanner_2d', name: "2D Shtrix-kod va Markirovka (DataMatrix) skaneri", essential: true },
      { id: 'receipt_printer', name: "80mm tezkor termochek printeri (Avto-qirqish bilan)", essential: true },
      { id: 'barcode_scale', name: "Shtrix-kod chop etuvchi elektron tarozi (Shtrih-M / Rongta)", essential: true },
      { id: 'cash_drawer', name: "Avtomatik ochiluvchi metall pul qutisi", essential: false },
      { id: 'ups', name: "UPS (Elektr uzilishida 1-2 soat kassa ishlashi uchun)", essential: false }
    ],
    rules: [
      "Tez aylanuvchi (top-20) tovarlar hech qachon omborda tugab qolmasligi uchun minimal qoldiq (min-ostatok) xabarnomasini yoqing.",
      "Asl Belgisi markirovkalangan mahsulotlarni faqat 2D skaner orqali to'g'ridan-to'g'ri soliq chekiga chiqarishni ta'minlang.",
      "Kunlik kassa smenasini xodimlar bilan birga Z-hisobot orqali 5 daqiqada taqqoslab yoping."
    ]
  },
  retail_general: {
    id: 'retail_general',
    name: "Chakana savdo (Kiyim, Qurilish mollari, Kosmetika, Uy-ro'zg'or)",
    category: "savdo",
    icon: 'Store',
    avgCpl: { instagram: 1.2, telegram: 0.8, google: 2.0, tiktok: 0.7 },
    avgConversion: 20,
    avgCheck: 45,
    avgMargin: 35,
    typicalFixedCosts: 1500,
    typicalInventory: 25000,
    autoInvestCost: 850,
    softwareTip: "1C: Savdoni boshqarish (УТ) yoki 1C: Chakana savdo + Telegram orqali rahbar hisoboti va mijozlar bonus boti.",
    tip: "Chakana savdoda qoldiq tovarlar 'muzlab qolishi' aylanma mablag'ni yeb qo'yadi. ABC-tahlil shart.",
    benchmarks: [
      { name: "Sof marja foizi", userMetric: "netMargin", userSuffix: "%", marketAvg: "28-35%", top10: "45%+", note: "Kuchli brend va eksklyuziv mahsulot assortimenti marjani 45% dan yuqoriga olib chiqadi." },
      { name: "Ombor tovar aylanishi", userValue: "60 kun", marketAvg: "60 kun", top10: "30 kun", note: "Omborda tovar 30 kunda aylanmasa, aylanma pul muzlaydi va qarz majburiyatlari o'sadi." },
      { name: "Sotuv konversiyasi", userMetric: "conversionRate", userSuffix: "%", marketAvg: "25%", top10: "45%+", note: "Sotuvchilar skript va kassa takliflari orqali har 2 ta kurgandan 1 tasiga sotishadi." },
      { name: "Nasiya qaytish muddati", userValue: "30 kun", marketAvg: "30 kun", top10: "10 kun", note: "Qat'iy limit va SMS eslatmalar pulning o'z vaqtida qaytishini kafolatlaydi." }
    ],
    hardwareChecklist: [
      { id: 'pos_terminal', name: "Sensorli POS-monoblok yoki Kassa noutbuki", essential: true },
      { id: 'scanner_2d', name: "2D Simsiz/Simli shtrix-kod skaneri (Markirovka o'qiydigan)", essential: true },
      { id: 'label_printer', name: "Godex / Xprinter shtrix-kod va etiketka printeri", essential: true },
      { id: 'receipt_printer', name: "80mm yoki 58mm termochek printeri", essential: true },
      { id: 'cash_drawer', name: "Avtomatik metall pul qutisi", essential: false },
      { id: 'ts_terminal', name: "TSD (Ma'lumot yig'ish terminali - tezkor reviziya uchun)", essential: false }
    ],
    rules: [
      "ABC-tahlil orqali ombordagi 20% eng ko'p foyda keltiruvchi tovarlarni aniqlab, muzlagan nelikvidlarni chegirmada naqdga aylantiring.",
      "Mijozlar telefon raqamiga bog'langan avtomatik 3-5% keshbek tizimini joriy qilib, takroriy xaridni 30% oshiring.",
      "Nasiya berish chegarasi (limiti)ni har bir mijoz uchun qat'iy dasturda belgilang."
    ]
  },
  wholesale_b2b: {
    id: 'wholesale_b2b',
    name: "Ulgurji savdo (Optom, Distribyutsiya, Dilerlik)",
    category: "savdo",
    icon: 'Truck',
    avgCpl: { instagram: 4.5, telegram: 2.8, google: 6.0, tiktok: 2.0 },
    avgConversion: 12,
    avgCheck: 800,
    avgMargin: 20,
    typicalFixedCosts: 2500,
    typicalInventory: 60000,
    autoInvestCost: 1500,
    softwareTip: "1C: Savdoni boshqarish (УТ) + Savdo agentlari uchun mobil ilova (Smartup / Agentlik) va Debitorlik nazorati.",
    tip: "Nasiya daftarda yuritilsa, aylanma mablag'ning 15-20% yillab qaytmasligi mumkin.",
    benchmarks: [
      { name: "Ulgurji sof marja", userMetric: "netMargin", userSuffix: "%", marketAvg: "8-12%", top10: "16%+", note: "Yirik aylanmada 4% qo'shimcha marja korxonaga yuz minglab dollar sof foyda beradi." },
      { name: "Debitorlik (Nasiya) qaytishi", userValue: "30 kun", marketAvg: "30 kun", top10: "7-14 kun", note: "Nasiyaning 14 kunda qaytishi yiliga pul aylanmasi tezligini 2 barobar tezlashtiradi." },
      { name: "Ombor tovar aylanishi", userValue: "20 kun", marketAvg: "20 kun", top10: "10 kun", note: "Tezkor logistika va agentlar buyurtmalarini avtomatlashtirish hisobiga erishiladi." }
    ],
    hardwareChecklist: [
      { id: 'server_pc', name: "Asosiy 1C Server kompyuteri (SSD va tezkor RAM bilan)", essential: true },
      { id: 'tsd_scanner', name: "TSD (Katta ombor uchun sanoat skaneri)", essential: true },
      { id: 'label_industrial', name: "Sanoat darajasidagi etiketka printeri", essential: true },
      { id: 'tablets', name: "Agentlar uchun planshet/smartfon mobil savdo bazasi", essential: true },
      { id: 'backup_drive', name: "Avtomatik kundalik zaxira nusxa diski (Backup Drive)", essential: true }
    ],
    rules: [
      "Qarzdorlik muddati 15 kundan oshgan mijozlarga avtomatik tovar yuklashni dasturda bloklang.",
      "Har bir savdo agenti buyurtmalarni faqat mobil ilovadan real vaqtda bazaga tushirsin.",
      "Haftalik P&L va pul oqimi (Cash Flow) hisobotini dasturdan bir tugma bilan oling."
    ]
  },
  horeca_cafe: {
    id: 'horeca_cafe',
    name: "Kafe, Restoran, Fast-Food & Qahvaxona",
    category: "xizmat",
    icon: 'Coffee',
    avgCpl: { instagram: 0.8, telegram: 0.5, google: 1.8, tiktok: 0.4 },
    avgConversion: 28,
    avgCheck: 20,
    avgMargin: 35,
    typicalFixedCosts: 2200,
    typicalInventory: 8000,
    autoInvestCost: 1100,
    softwareTip: "Poster, Jowi, iiko yoki 1C: Umumiy ovqatlanish + Oshxona ekrani (KDS) va Telegram-bot yetkazib berish.",
    tip: "Yaxshi servis va sodiqlik tizimi orqali takroriy tashriflarni 40% oshirish mumkin.",
    benchmarks: [
      { name: "Food-cost (Masalliq ulushi)", userValue: "38%", marketAvg: "40-45%", top10: "28-32%", note: "Masalliq sarfini 30% dan oshirmaslik uchun har bir taomga qat'iy tex-karta kiritiladi." },
      { name: "Sof foyda marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "20-25%", top10: "35%+", note: "Menyu muhandisligi va marjali ichimliklar/desertlar orqali sof foyda keskin oshadi." },
      { name: "O'rtacha stol aylanishi", userValue: "kuniga 4 marta", marketAvg: "kuniga 4 marta", top10: "kuniga 7-8 marta", note: "Tezkor ofitsiantlar va oshxona printeri stol bo'shash vaqtini 15 daqiqaga qisqartiradi." }
    ],
    hardwareChecklist: [
      { id: 'pos_waterproof', name: "Sensorli namlikka chidamli POS-monoblok", essential: true },
      { id: 'kitchen_printer', name: "Oshxona va Bar uchun qo'ng'iroqli (Buzzer) chek printeri", essential: true },
      { id: 'waiter_tablets', name: "Ofitsiantlar uchun buyurtma qabul qilish mini-planshetlari", essential: false },
      { id: 'cash_drawer', name: "Kassa pul qutisi", essential: true },
      { id: 'caller_id', name: "Yetkazib berish uchun Caller ID (telefon integratsiyasi)", essential: false }
    ],
    rules: [
      "Har bir taom uchun tex-karta (kalkulyatsiya) kiriting — shunda oshpazlar isrofi va o'g'irliklar 90% yo'qoladi.",
      "Stop-list tizimini yoqing: mahsulot oshxonada tugasa, ofitsiantlar buyurtma ololmasin.",
      "Mijozlarga Telegram orqali har xariddan 5% keshbek berib, takroriy tashrifni oshiring."
    ]
  },
  manufacturing: {
    id: 'manufacturing',
    name: "Ishlab chiqarish & Sexlar (Mebel, Tekstil, Qandolat va h.k.)",
    category: "ishlab_chiqarish",
    icon: 'Factory',
    avgCpl: { instagram: 3.5, telegram: 2.2, google: 5.5, tiktok: 1.8 },
    avgConversion: 14,
    avgCheck: 650,
    avgMargin: 30,
    typicalFixedCosts: 3000,
    typicalInventory: 40000,
    autoInvestCost: 1800,
    softwareTip: "1C: ERP / 1C: Ishlab chiqarish korxonasini boshqarish (УПП) + Sexlararo harakat va ishbay maosh hisobi.",
    tip: "Ishlab chiqarishda hom-ashyo isrofi va nosoz mahsulot (brak) foizi rentabellikni keskin tushiradi.",
    benchmarks: [
      { name: "Xomashyo braki / yo'qotishi", userValue: "8%", marketAvg: "8-12%", top10: "<2%", note: "Brakni 2% dan tushirish to'g'ridan-to'g'ri korxonaning sof foydasini 12% ga oshiradi." },
      { name: "Sof rentabellik marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "20-25%", top10: "32%+", note: "Tannarx kalkulyatsiyasidagi noaniqliklarni bartaraf etish hisobiga erishiladi." },
      { name: "Buyurtma bajarish aniqligi", userValue: "92%", marketAvg: "95%", top10: "99%+", note: "Sexlararo operatsiyalarning reja-grafigi to'liq avtomatlashganda muddatlar buzilmaydi." }
    ],
    hardwareChecklist: [
      { id: 'server_pc', name: "Kuchli 1C Server va Buxgalteriya kompyuterlari", essential: true },
      { id: 'barcode_industrial', name: "Sexlar uchun sanoat shtrix-kod skaneri", essential: true },
      { id: 'weight_platform', name: "Hom-ashyo qabul qilish uchun platformali tarozi", essential: true },
      { id: 'label_durable', name: "Namlikka va yirtilishga chidamli etiketka printeri", essential: true }
    ],
    rules: [
      "Hom-ashyoni sexlarga faqat moddiy javobgar shaxs tilxati va dasturiy nakladnoy orqali bering.",
      "Tayyor mahsulot tannarxiga nafaqat hom-ashyo, balki elektr, ijara va ishbay maoshni avtomat taqsimlang.",
      "Brak mahsulotlar foizini har hafta monitoring qilib, uning sabablarini bartaraf eting."
    ]
  },
  education_courses: {
    id: 'education_courses',
    name: "O'quv markazlari, Kurslar & Ta'lim",
    category: "talim",
    icon: 'GraduationCap',
    avgCpl: { instagram: 1.8, telegram: 1.2, google: 3.5, tiktok: 1.0 },
    avgConversion: 18,
    avgCheck: 80,
    avgMargin: 45,
    typicalFixedCosts: 1600,
    typicalInventory: 2000,
    autoInvestCost: 700,
    softwareTip: "Ta'lim CRM tizimi (Modme / AmoCRM) + O'quvchilar davomati Face ID/Turniket va SMS xabarnoma.",
    tip: "Birinchi ochiq bepul darsga lidlarni yig'ish va 10 daqiqada bog'lanish asosiy drayver.",
    benchmarks: [
      { name: "Sinov darsiga konversiya", userMetric: "conversionRate", userSuffix: "%", marketAvg: "15-20%", top10: "40%+", note: "Murojaat qilgan lidga 5 daqiqada qo'ng'iroq qilinganda sinov darsiga kelish 40% ga yetadi." },
      { name: "O'quvchi qolish muddati (LTV)", userValue: "2.5 oy", marketAvg: "2.5 oy", top10: "5.5+ oy", note: "O'quvchilar 5 oydan ortiq o'qisa, markaz reklamasiz ham to'la zallarda ishlaydi." },
      { name: "Sof rentabellik marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "30%", top10: "48%", note: "Xonalar bandligi 80%+ ga yetganda marja eng yuqori nuqtasiga chiqadi." }
    ],
    hardwareChecklist: [
      { id: 'face_id', name: "O'quvchilar davomati uchun Face ID yoki Barmoq izi skaneri", essential: true },
      { id: 'reception_pc', name: "Administrator uchun tezkor noutbuk/kompyuter", essential: true },
      { id: 'sms_gateway', name: "Ota-onalarga avtomatik SMS yuboruvchi shlyuz integratsiyasi", essential: true },
      { id: 'receipt_small', name: "To'lov cheki printeri", essential: false }
    ],
    rules: [
      "To'lov muddati o'tgan o'quvchilar ota-onalariga dars boshlanishidan 2 kun oldin avtomatik eslatma yuboring.",
      "Sinov darsiga yozilgan lidlarga 15 daqiqadan kechikmay qo'ng'iroq qilib, darsga kelish konversiyasini oshiring.",
      "Har bir o'qituvchining oylik saqlab qolish (Retention) ko'rsatkichiga qarab bonus bering."
    ]
  },
  services_general: {
    id: 'services_general',
    name: "Xizmatlar (Tibbiyot, Go'zallik, Avtoservis, Ta'mirlash)",
    category: "xizmat",
    icon: 'Briefcase',
    avgCpl: { instagram: 2.2, telegram: 1.5, google: 4.0, tiktok: 1.2 },
    avgConversion: 25,
    avgCheck: 110,
    avgMargin: 50,
    typicalFixedCosts: 1700,
    typicalInventory: 5000,
    autoInvestCost: 750,
    softwareTip: "Elektron qabul & Jadval tizimi (Yclients / 1C: Xizmat) + Ustalar KPI va Telegram eslatma boti.",
    tip: "Mijozlar bilan ishonch va usta/shifokor tavsiyalari sotuvni 2 barobar osonlashtiradi.",
    benchmarks: [
      { name: "Mijoz qaytish darajasi (Retention)", userValue: "35%", marketAvg: "30%", top10: "70%+", note: "Har 10 ta mijozdan 7 tasini qaytara olish yangi mijoz jalb qilish xarajatini 3x ga kamaytiradi." },
      { name: "Usta / Shifokor bandligi", userValue: "50%", marketAvg: "50%", top10: "85%", note: "Bo'sh qolib ketgan vaqtlarni oldindan to'ldirish uchun onlayn navbat va eslatmalar zarur." },
      { name: "Sof foyda marjasi", userMetric: "netMargin", userSuffix: "%", marketAvg: "35%", top10: "55%", note: "Sarf materiallarini aniq hisobdan chiqarish va qimmatroq xizmatlar hisobiga erishiladi." }
    ],
    hardwareChecklist: [
      { id: 'reception_pc', name: "Administrator uchun sensorli planshet yoki noutbuk", essential: true },
      { id: 'thermal_printer', name: "Mijozga kvitansiya beruvchi termochek printeri", essential: true },
      { id: 'barcode_spare', name: "Ehtiyot qismlar va sarf materiallari uchun mini-skaner", essential: false },
      { id: 'sms_sender', name: "Tashrif eslatuvchi avtomatik SMS tizimi", essential: true }
    ],
    rules: [
      "Mijozga qabul vaqtini 2 soat oldin avtomatik SMS/Telegram orqali eslatib, bo'sh qolib ketishni 70% kamaytiring.",
      "Sarf materiallari (kraska, ehtiyot qismlar, shpritslar)ni har bir ko'rsatilgan xizmatga avtomat hisobdan chiqaring.",
      "Doimiy mijozlarga keyingi profilaktika yoki xizmat muddatini oldindan eslatib, qayta chaqiring."
    ]
  },
  other_biz: {
    id: 'other_biz',
    name: "Boshqa soha",
    category: "boshqa",
    icon: 'Sparkles',
    avgCpl: { instagram: 1.5, telegram: 1.0, google: 3.0, tiktok: 0.8 },
    avgConversion: 20,
    avgCheck: 70,
    avgMargin: 30,
    typicalFixedCosts: 1500,
    typicalInventory: 10000,
    autoInvestCost: 800,
    softwareTip: "Biznesingizga mos zamonaviy POS dastur yoki 1C: Korxona avtomatlashtirish tizimi.",
    tip: "Hisob-kitob qilinmagan narsani boshqarib ham, o'stirib ham bo'lmaydi.",
    benchmarks: [
      { name: "Sof marja foizi", userMetric: "netMargin", userSuffix: "%", marketAvg: "25%", top10: "40%", note: "Tizimli hisob va xarajatlarni optimallashtirish hisobiga o'sadi." },
      { name: "Sotuv konversiyasi", userMetric: "conversionRate", userSuffix: "%", marketAvg: "20%", top10: "38%", note: "Tezkor javob berish va mijozlar bazasi (CRM) bilan ishlash natijasi." },
      { name: "Takroriy xaridlar", userValue: "25%", marketAvg: "25%", top10: "50%", note: "Muntazam aloqa va keshbek tizimi qayta xaridlarni 2 barobar ko'paytiradi." }
    ],
    hardwareChecklist: [
      { id: 'pos_terminal', name: "Kassa kompyuteri yoki noutbuki", essential: true },
      { id: 'scanner_2d', name: "2D Shtrix-kod skaneri", essential: true },
      { id: 'receipt_printer', name: "Termochek printeri", essential: true }
    ],
    rules: [
      "Daromad va xarajatlarni har kuni bitta elektron bazada yuring.",
      "Nasiyalarni daftardan dasturga o'tkazing.",
      "Muntazam reviziya o'tkazib turing."
    ]
  }
};

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram Target', icon: 'Instagram', multiplier: 1.0 },
  { id: 'telegram', name: 'Telegram Kanallar & Ads', icon: 'Send', multiplier: 0.8 },
  { id: 'google', name: 'Google Ads (Qidiruv/KMS)', icon: 'Globe', multiplier: 1.6 },
  { id: 'tiktok', name: 'TikTok Ads', icon: 'Video', multiplier: 0.7 },
  { id: 'bloggers', name: 'Blogerlar & Reklama', icon: 'Users', multiplier: 1.2 },
  { id: 'organic', name: 'Tavsiyalar / Sarafan (Og\'zaki)', icon: 'HeartHandshake', multiplier: 0.5 }
];