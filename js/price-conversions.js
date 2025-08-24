let cachedRate = undefined, cachedCurrency = undefined;

async function convertEuroToLocalCurrency(euroAmount) {
    try {
        if (cachedRate === undefined || cachedCurrency === undefined) {
            const ipInfo = await fetch("https://ipapi.co/json/");
            const ipResponse = await ipInfo.json();

            const currency = ipResponse.currency;

            if (!currency) {
                throw new Error("Failed to find currency");
            }

            const exchangeResponse = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
            const exchangeData = await exchangeResponse.json();

            const rate = exchangeData.rates[currency];

            if (!rate) {
                throw new Error(`Exchange rate for ${currency} not available`);
            }

            cachedRate = rate;
            cachedCurrency = currencySymbols[currency];
        }

        const localAmount = euroAmount * cachedRate;

        if (isNaN(localAmount))
            return `${euroAmount} €`;
        else
            return `${localAmount.toFixed(2)} ${cachedCurrency}`;
    } catch (error) {
        console.error(`Error: ${error}`);
        return `${euroAmount} €`;
    }
}

const currencySymbols = {
    AED: 'د.إ',   // UAE Dirham
    AFN: '؋',     // Afghan Afghani
    ALL: 'L',     // Albanian Lek
    AMD: '֏',     // Armenian Dram
    ANG: 'ƒ',     // Netherlands Antillean Guilder
    AOA: 'Kz',    // Angolan Kwanza
    ARS: '$',     // Argentine Peso
    AUD: 'A$',    // Australian Dollar
    AWG: 'ƒ',     // Aruban Florin
    AZN: '₼',     // Azerbaijani Manat
    BAM: 'KM',    // Bosnia-Herzegovina Convertible Mark
    BBD: 'B$',    // Barbados Dollar
    BDT: '৳',     // Bangladeshi Taka
    BGN: 'лв',    // Bulgarian Lev
    BHD: '.د.ب',  // Bahraini Dinar
    BMD: '$',     // Bermudian Dollar
    BND: 'B$',    // Brunei Dollar
    BOB: 'Bs.',   // Bolivian Boliviano
    BRL: 'R$',    // Brazilian Real
    BSD: '$',     // Bahamian Dollar
    BWP: 'P',     // Botswana Pula
    BYN: 'Br',    // Belarusian Ruble
    BZD: 'BZ$',   // Belize Dollar
    CAD: 'C$',    // Canadian Dollar
    CDF: 'FC',    // Congolese Franc
    CHF: 'CHF',   // Swiss Franc
    CLP: '$',     // Chilean Peso
    CNY: '¥',     // Chinese Yuan
    COP: '$',     // Colombian Peso
    CRC: '₡',     // Costa Rican Colón
    CUP: '₱',     // Cuban Peso
    CVE: '$',     // Cape Verdean Escudo
    CZK: 'Kč',    // Czech Koruna
    DJF: 'Fdj',   // Djiboutian Franc
    DKK: 'kr',    // Danish Krone
    DOP: 'RD$',   // Dominican Peso
    DZD: 'د.ج',   // Algerian Dinar
    EGP: '£',     // Egyptian Pound
    ERN: 'Nfk',   // Eritrean Nakfa
    ETB: 'Br',    // Ethiopian Birr
    EUR: '€',     // Euro
    FJD: 'FJ$',   // Fijian Dollar
    FKP: '£',     // Falkland Islands Pound
    GBP: '£',     // British Pound
    GEL: '₾',     // Georgian Lari
    GGP: '£',     // Guernsey Pound
    GHS: '₵',     // Ghanaian Cedi
    GIP: '£',     // Gibraltar Pound
    GMD: 'D',     // Gambian Dalasi
    GNF: 'FG',    // Guinean Franc
    GTQ: 'Q',     // Guatemalan Quetzal
    GYD: '$',     // Guyana Dollar
    HKD: 'HK$',   // Hong Kong Dollar
    HNL: 'L',     // Honduran Lempira
    HRK: 'kn',    // Croatian Kuna
    HTG: 'G',     // Haitian Gourde
    HUF: 'Ft',    // Hungarian Forint
    IDR: 'Rp',    // Indonesian Rupiah
    ILS: '₪',     // Israeli New Shekel
    IMP: '£',     // Isle of Man Pound
    INR: '₹',     // Indian Rupee
    IQD: 'ع.د',   // Iraqi Dinar
    IRR: '﷼',     // Iranian Rial
    ISK: 'kr',    // Icelandic Króna
    JEP: '£',     // Jersey Pound
    JMD: 'J$',    // Jamaican Dollar
    JOD: 'د.ا',   // Jordanian Dinar
    JPY: '¥',     // Japanese Yen
    KES: 'KSh',   // Kenyan Shilling
    KGS: 'сом',   // Kyrgyzstani Som
    KHR: '៛',     // Cambodian Riel
    KMF: 'CF',    // Comorian Franc
    KRW: '₩',     // South Korean Won
    KWD: 'د.ك',   // Kuwaiti Dinar
    KYD: '$',     // Cayman Islands Dollar
    KZT: '₸',     // Kazakhstani Tenge
    LAK: '₭',     // Lao Kip
    LBP: 'ل.ل',   // Lebanese Pound
    LKR: 'Rs',    // Sri Lankan Rupee
    LRD: '$',     // Liberian Dollar
    LSL: 'L',     // Lesotho Loti
    LYD: 'ل.د',   // Libyan Dinar
    MAD: 'د.م.',  // Moroccan Dirham
    MDL: 'L',     // Moldovan Leu
    MGA: 'Ar',    // Malagasy Ariary
    MKD: 'ден',   // Macedonian Denar
    MMK: 'K',     // Myanmar Kyat
    MNT: '₮',     // Mongolian Tögrög
    MOP: 'MOP$',  // Macanese Pataca
    MRU: 'UM',    // Mauritanian Ouguiya
    MUR: '₨',     // Mauritian Rupee
    MVR: 'Rf',    // Maldivian Rufiyaa
    MWK: 'MK',    // Malawian Kwacha
    MXN: '$',     // Mexican Peso
    MYR: 'RM',    // Malaysian Ringgit
    MZN: 'MT',    // Mozambican Metical
    NAD: '$',     // Namibian Dollar
    NGN: '₦',     // Nigerian Naira
    NIO: 'C$',    // Nicaraguan Córdoba
    NOK: 'kr',    // Norwegian Krone
    NPR: '₨',     // Nepalese Rupee
    NZD: 'NZ$',   // New Zealand Dollar
    OMR: 'ر.ع.',  // Omani Rial
    PAB: 'B/.',   // Panamanian Balboa
    PEN: 'S/.',   // Peruvian Sol
    PGK: 'K',     // Papua New Guinean Kina
    PHP: '₱',     // Philippine Peso
    PKR: '₨',     // Pakistani Rupee
    PLN: 'zł',    // Polish Zloty
    PYG: '₲',     // Paraguayan Guarani
    QAR: 'ر.ق',   // Qatari Riyal
    RON: 'lei',   // Romanian Leu
    RSD: 'дин',   // Serbian Dinar
    RUB: '₽',     // Russian Ruble
    RWF: 'FRw',   // Rwandan Franc
    SAR: 'ر.س',   // Saudi Riyal
    SBD: '$',     // Solomon Islands Dollar
    SCR: '₨',     // Seychellois Rupee
    SDG: 'ج.س.',  // Sudanese Pound
    SEK: 'kr',    // Swedish Krona
    SGD: 'S$',    // Singapore Dollar
    SHP: '£',     // Saint Helena Pound
    SLL: 'Le',    // Sierra Leonean Leone
    SOS: 'S',     // Somali Shilling
    SRD: '$',     // Surinamese Dollar
    STN: 'Db',    // São Tomé and Príncipe Dobra
    SVC: '$',     // El Salvador Colon
    SYP: '£',     // Syrian Pound
    SZL: 'E',     // Swazi Lilangeni
    THB: '฿',     // Thai Baht
    TJS: 'ЅМ',    // Tajikistani Somoni
    TMT: 'm',     // Turkmenistan Manat
    TND: 'د.ت',   // Tunisian Dinar
    TOP: 'T$',    // Tongan Paʻanga
    TRY: '₺',     // Turkish Lira
    TTD: 'TT$',   // Trinidad and Tobago Dollar
    TWD: 'NT$',   // New Taiwan Dollar
    TZS: 'Sh',    // Tanzanian Shilling
    UAH: '₴',     // Ukrainian Hryvnia
    UGX: 'Sh',    // Ugandan Shilling
    USD: '$',     // US Dollar
    UYU: '$U',    // Uruguayan Peso
    UZS: 'soʻm',  // Uzbekistani Som
    VES: 'Bs.',   // Venezuelan Bolívar
    VND: '₫',     // Vietnamese Dong
    VUV: 'VT',    // Vanuatu Vatu
    WST: 'WS$',   // Samoan Tala
    XAF: 'FCFA',  // Central African CFA Franc
    XCD: 'EC$',   // East Caribbean Dollar
    XOF: 'CFA',   // West African CFA Franc
    XPF: '₣',     // CFP Franc
    YER: '﷼',     // Yemeni Rial
    ZAR: 'R',     // South African Rand
    ZMW: 'ZK',    // Zambian Kwacha
    ZWL: '$',     // Zimbabwean Dollar
};