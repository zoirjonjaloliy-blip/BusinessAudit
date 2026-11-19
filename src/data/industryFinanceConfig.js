/**
 * BiznesTahlili.uz PRO 5.0 — Sohaviy Moliyaviy Maydonlar Konfiguratsiyasi
 * 
 * Har bir sohaning o'ziga xos tushum, chek, konversiya, ombor va xodim atamalari.
 */

export const INDUSTRY_FINANCE_CONFIG = {
  // 1. Oziq-ovqat / Supermarket
  retail_food: {
    revenueLabel: "Oylik umumiy kassa savdosi ($)",
    revenuePlaceholder: "30000",
    revenueHint: "Do'kon va kassa apparatlaridan o'tadigan oylik umumiy savdo",
    checkLabel: "O'rtacha 1 ta kassa cheki ($)",
    checkPlaceholder: "8",
    checkHint: "1 ta xaridor savatiga o'rtacha qancha pul to'laydi",
    conversionLabel: "Do'konga kirganlarning xarid qilish ulushi (%)",
    conversionPlaceholder: "85",
    conversionHint: "Do'konga kirgan 100 kishidan nechtasi tovar sotib oladi",
    inventoryLabel: "Do'kon va ombordagi jami tovar qoldig'i ($)",
    inventoryPlaceholder: "18000",
    inventoryHint: "Hozirda tokchalar va omborda turgan tovarlar umumiy tannarxi",
    employeesLabel: "Kassir va xodimlar soni (nafar)",
    employeesPlaceholder: "6",
    areaLabel: "Savdo zali maydoni (kv.m)",
    areaPlaceholder: "120",
    showInventory: true,
    leadsLabel: "Oylik xarid cheklari soni",
    customersLabel: "Oylik xaridorlar soni"
  },

  // 2. Chakana savdo (Kiyim, Qurilish mollari, Kosmetika)
  retail_general: {
    revenueLabel: "Oylik savdo aylanmasi ($)",
    revenuePlaceholder: "20000",
    revenueHint: "Barcha do'kon va savdo nuqtalaridan oylik jami tushum",
    checkLabel: "O'rtacha 1 ta xarid cheki ($)",
    checkPlaceholder: "35",
    checkHint: "Bitta mijoz bir xaridda o'rtacha to'laydigan summa",
    conversionLabel: "Kirgan/yozgan mijozlardan sotib olish foizi (%)",
    conversionPlaceholder: "35",
    conversionHint: "Do'konga kirgan yoki yozgan xaridorlardan xarid qilganlar ulushi",
    inventoryLabel: "Ombordagi tovar qoldig'i qiymati ($)",
    inventoryPlaceholder: "25000",
    inventoryHint: "Do'kon va zaxira ombordagi muzlab turgan barcha tovarlar summasi",
    employeesLabel: "Sotuvchi va xodimlar soni (nafar)",
    employeesPlaceholder: "4",
    areaLabel: "Do'kon maydoni (kv.m)",
    areaPlaceholder: "70",
    showInventory: true,
    leadsLabel: "Kerakli lidlar (Murojaatlar soni)",
    customersLabel: "Oylik xaridorlar soni"
  },

  // 3. Ulgurji savdo (Optom, Distribyutsiya)
  wholesale_b2b: {
    revenueLabel: "Oylik ulgurji yuk aylanmasi ($)",
    revenuePlaceholder: "80000",
    revenueHint: "Dilerlar va do'konlarga jo'natilgan oylik jami tovar aylanmasi",
    checkLabel: "O'rtacha 1 ta nakladnoy / yuk summasi ($)",
    checkPlaceholder: "800",
    checkHint: "Bitta buyurtma yoki nakladnoy bo'yicha o'rtacha jo'natma summasi",
    conversionLabel: "Narx so'ragan do'konlardan buyurtma olish foizi (%)",
    conversionPlaceholder: "30",
    conversionHint: "Prays so'ragan yoki aloqaga chiqqan B2B mijozlardan buyurtmaga aylangani",
    inventoryLabel: "Ulgurji ombordagi tovar zaxirasi ($)",
    inventoryPlaceholder: "60000",
    inventoryHint: "Ulgurji omborda aylanmada turgan umumiy tovar zaxirasi",
    employeesLabel: "Savdo agentlari va xodimlar soni (nafar)",
    employeesPlaceholder: "8",
    areaLabel: "Ombor maydoni (kv.m)",
    areaPlaceholder: "250",
    showInventory: true,
    leadsLabel: "Murojaat qilgan B2B mijozlar soni",
    customersLabel: "Faol do'konlar / Buyurtmachilar soni"
  },

  // 4. Dorixona (Apteka)
  pharmacy: {
    revenueLabel: "Oylik dori-darmon savdosi ($)",
    revenuePlaceholder: "25000",
    revenueHint: "Dorixona kassasidan oylik jami dori va parafarmatsevtika savdosi",
    checkLabel: "O'rtacha 1 ta bemor cheki ($)",
    checkPlaceholder: "10",
    checkHint: "Dorixonaga kirgan bemor bitta chekda o'rtacha qancha dori xarid qiladi",
    conversionLabel: "Kirgan xaridorlarning dori olib chiqish foizi (%)",
    conversionPlaceholder: "80",
    conversionHint: "Dorixonaga kirganlarning retsept bo'yicha xarid qilish darajasi",
    inventoryLabel: "Dorixonadagi jami dori qoldig'i ($)",
    inventoryPlaceholder: "22000",
    inventoryHint: "Javonlar va ombordagi jami dorilar tannarx qiymati",
    employeesLabel: "Provizor va farmatsevtlar soni (nafar)",
    employeesPlaceholder: "4",
    areaLabel: "Dorixona maydoni (kv.m)",
    areaPlaceholder: "50",
    showInventory: true,
    leadsLabel: "Oylik xarid cheklari soni",
    customersLabel: "Oylik xaridor bemorlar soni"
  },

  // 5. Klinika / Stomatologiya
  clinic_medical: {
    revenueLabel: "Oylik tibbiy xizmatlar tushumi ($)",
    revenuePlaceholder: "35000",
    revenueHint: "Ko'rik, tahlil, muolaja va operatsiyalardan oylik jami kassa tushumi",
    checkLabel: "1 bemorning o'rtacha davolanish cheki ($)",
    checkPlaceholder: "45",
    checkHint: "Bemor ko'rik va muolajalarga o'rtacha sarflaydigan summa",
    conversionLabel: "Murojaat qilganlardan qabulga kelish foizi (%)",
    conversionPlaceholder: "40",
    conversionHint: "Qo'ng'iroq qilgan yoki yozganlardan shifokor qabuliga yetib kelganlar ulushi",
    inventoryLabel: "Reaktiv va tibbiy materiallar zaxirasi ($)",
    inventoryPlaceholder: "4000",
    inventoryHint: "Ombordagi dori, reaktiv, shprits va tibbiy sarflar zaxirasi",
    employeesLabel: "Shifokor, hamshira va xodimlar soni (nafar)",
    employeesPlaceholder: "10",
    areaLabel: "Klinika maydoni (kv.m)",
    areaPlaceholder: "150",
    showInventory: true,
    leadsLabel: "Murojaat qilgan bemorlar soni",
    customersLabel: "Oylik qabul qilingan bemorlar soni"
  },

  // 6. Kafe, Restoran, Fast-Food (HoReCa)
  horeca_cafe: {
    revenueLabel: "Oylik kassa tushumi ($)",
    revenuePlaceholder: "20000",
    revenueHint: "Zal va yetkazib berishdan (dostavka) oylik jami tushum",
    checkLabel: "O'rtacha 1 ta stol / buyurtma cheki ($)",
    checkPlaceholder: "15",
    checkHint: "1 ta mehmon yoki stol o'rtacha buyurtma qiladigan summa",
    conversionLabel: "Qayta keluvchi doimiy mehmonlar ulushi (%)",
    conversionPlaceholder: "45",
    conversionHint: "Bir marta kelib, yana qayta tashrif buyuradigan mehmonlar foizi",
    inventoryLabel: "Oshxona masalliqlari va ichimliklar zaxirasi ($)",
    inventoryPlaceholder: "3000",
    inventoryHint: "Oshxona omborida, muzlatgichda turgan go'sht, sabzavot va masalliqlar qiymati",
    employeesLabel: "Oshpaz, ofitsiant va xodimlar soni (nafar)",
    employeesPlaceholder: "8",
    areaLabel: "Zal maydoni (kv.m)",
    areaPlaceholder: "100",
    showInventory: true,
    leadsLabel: "Oylik mehmonlar va buyurtmalar soni",
    customersLabel: "Oylik mehmonlar soni"
  },

  // 7. Ishlab chiqarish & Sexlar (Tunukafon, mebel, qozon, tikuv)
  manufacturing: {
    revenueLabel: "Oylik ishlab chiqarish savdosi ($)",
    revenuePlaceholder: "50000",
    revenueHint: "Ishlab chiqarilgan tayyor mahsulotlarning oylik jami sotuv summasi",
    checkLabel: "O'rtacha 1 ta buyurtma / shartnoma summasi ($)",
    checkPlaceholder: "1500",
    checkHint: "Bitta shartnoma yoki buyurtmaning o'rtacha qiymati",
    conversionLabel: "Narx hisoblatganlardan shartnoma tuzish foizi (%)",
    conversionPlaceholder: "25",
    conversionHint: "Buyurtma hisoblatgan mijozlardan zakaz berib pul to'laganlari ulushi",
    inventoryLabel: "Xomashyo va tayyor mahsulot ombori ($)",
    inventoryPlaceholder: "30000",
    inventoryHint: "Sexdagi xomashyo (tunuka, profil, mato, yog'och) va tayyor mahsulotlar qiymati",
    employeesLabel: "Ustalar va ishchilar soni (nafar)",
    employeesPlaceholder: "12",
    areaLabel: "Sex va ombor maydoni (kv.m)",
    areaPlaceholder: "300",
    showInventory: true,
    leadsLabel: "Narx hisoblatgan buyurtmachilar soni",
    customersLabel: "Oylik buyurtmalar (shartnomalar) soni"
  },

  // 8. O'quv markazlari & Kurslar
  education_courses: {
    revenueLabel: "Oylik kurs to'lovlari tushumi ($)",
    revenuePlaceholder: "12000",
    revenueHint: "Barcha guruh va individual o'quvchilarning oylik to'lovlar summasi",
    checkLabel: "1 nafar o'quvchining oylik to'lovi ($)",
    checkPlaceholder: "60",
    checkHint: "1 o'quvchi uchun 1 oylik o'rtacha kurs narxi",
    conversionLabel: "Sinov darsidan o'qishga yozilish foizi (%)",
    conversionPlaceholder: "35",
    conversionHint: "Sinov darsiga kelib, to'lov qilib guruhga qo'shilganlar ulushi",
    inventoryLabel: "",
    inventoryPlaceholder: "",
    inventoryHint: "",
    employeesLabel: "O'qituvchi va adminlar soni (nafar)",
    employeesPlaceholder: "7",
    areaLabel: "O'quv markazi maydoni (kv.m)",
    areaPlaceholder: "120",
    showInventory: false,
    leadsLabel: "Sinov darsiga yozilgan o'quvchilar (Lidlar)",
    customersLabel: "Jami faol o'quvchilar soni"
  },

  // 9. Xizmatlar (Avto-servis, Go'zallik saloni va b.)
  services_general: {
    revenueLabel: "Oylik xizmatlar tushumi ($)",
    revenuePlaceholder: "10000",
    revenueHint: "Ko'rsatilgan xizmatlar va ehtiyot qismlardan oylik jami tushum",
    checkLabel: "1 mijozga ko'rsatilgan o'rtacha xizmat ($)",
    checkPlaceholder: "30",
    checkHint: "Bitta tashrifda mijoz xizmat uchun to'laydigan o'rtacha summa",
    conversionLabel: "Murojaat qilganlardan xizmatga kelish foizi (%)",
    conversionPlaceholder: "45",
    conversionHint: "Qo'ng'iroq qilgan yoki yozganlardan ustaxona/salonga yetib kelganlar ulushi",
    inventoryLabel: "Sarf materiallari zaxirasi ($)",
    inventoryPlaceholder: "1500",
    inventoryHint: "Ustaxonadagi ehtiyot qismlar, moylar, bo'yoqlar va sarflar qiymati",
    employeesLabel: "Ustalar va xodimlar soni (nafar)",
    employeesPlaceholder: "5",
    areaLabel: "Bino / Boks maydoni (kv.m)",
    areaPlaceholder: "80",
    showInventory: true,
    leadsLabel: "Murojaat qilgan va navbat olgan mijozlar",
    customersLabel: "Oylik xizmat ko'rsatilgan mijozlar soni"
  },

  // 10. Boshqa soha (Standart)
  other_biz: {
    revenueLabel: "Oylik daromad (tushum) maqsadi ($)",
    revenuePlaceholder: "15000",
    revenueHint: "Korxonaning oylik umumiy savdo va tushum aylanmasi",
    checkLabel: "O'rtacha chek qancha? ($)",
    checkPlaceholder: "50",
    checkHint: "Bitta mijoz bir xaridda o'rtacha to'laydigan summa",
    conversionLabel: "Sotuv konversiyasi (% da)",
    conversionPlaceholder: "25",
    conversionHint: "100 ta qiziqqan xaridordan nechtasi sotib oladi",
    inventoryLabel: "Ombordagi tovar qoldig'i summasi ($)",
    inventoryPlaceholder: "10000",
    inventoryHint: "Hozirda tokchalar yoki omborda muzlab turgan tovar zaxirasi",
    employeesLabel: "Jami xodimlar soni (nafar)",
    employeesPlaceholder: "5",
    areaLabel: "Bino / Do'kon maydoni (kv.m)",
    areaPlaceholder: "60",
    showInventory: true,
    leadsLabel: "Kerakli lidlar (Murojaatlar soni)",
    customersLabel: "Kerakli mijozlar soni"
  }
};

export function getIndustryFinanceConfig(industryId) {
  return INDUSTRY_FINANCE_CONFIG[industryId] || INDUSTRY_FINANCE_CONFIG.other_biz;
}

