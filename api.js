// ============================================================
//  KONFIGURASI JSONBIN  –  GANTI DENGAN MILIKMU
// ============================================================
const API_KEY = '$2a$10$rzsT8Jo18KEYQf5Nl1MyMuYPGpJ3/jHYTjpaKtPL/mgjwo0Jp3a2S';   // ganti dengan master key asli dari jsonbin.io
const BIN_ID  = '6a38eef9da38895dfeea2454';               // ganti dengan bin ID-mu (contoh: 6a38eef9da38895dfeea2454)
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ============================================================
//  DATA DEFAULT (jika bin kosong atau gagal fetch)
// ============================================================
const DEFAULT_PRODUCTS = [
    { id: 1, name: "Kelas / Jasa Bug Spammer", price: "Rp 5.000 / 14.000", image: "", demoUrl: "", isOpen: true, benefits: ["Diajarin trik bug tanpa panel", "Anti-banned sistem Cyber", "Target Spammer/Ripper Bebas", "Open Jasa Komersial Sendiri"] },
    { id: 2, name: "Web Payment / Biolink", price: "Rp 5.000 - 15.000", image: "", demoUrl: "https://nefu.life", isOpen: true, benefits: ["Design Luxury Corporate", "Full Rename & Custom Logo", "Sistem Pop-up Download QRIS", "Free Maintenance 10 Hari"] }
];

const DEFAULT_PARTNERS = [
    { name: "Siff Store", role: "Main Partner & Developer Support", avatar: "https://nefu.life/0_ZoEH.jpg", telegram: "https://t.me/zurranotdead" },
    { name: "Eka Store", role: "Reseller & Partner Resmi", avatar: "https://nefu.life/0_ZoEH.jpg", telegram: "https://t.me/ALLSANS62" }
];

const DEFAULT_TOOLS = [
    { name: "Spammer Tools", desc: "Kirim spam pesan instan tanpa delay untuk pengujian server.", url: "#", isActive: true },
    { name: "Link Creator", desc: "Bikin tautan kustom pendek secara otomatis.", url: "#", isActive: true }
];

const DEFAULT_BIOLINK_CONFIG = {
    bio: "Kalian nyari grub joki kontak terbuka?, sung join dibawah (Contoh doang bre) YANG MAU ORDER WEBSITENYA LANGSUNG",
    bgImage: "", whatsapp: "https://wa.me/6285789884293", tiktok: "#", instagram: "#", youtube: "#", email: "mailto:admin@zurra.store",
    popupText: "Zurra Store Melayani:\n• Jaspost Free Ke PM\n• MC/Rekber \n\nList Fee MC/Rekber:\n🛇-🛅ᴋ: 🛇ᴋ\n🛆-🛈🛅ᴋ: 🛈ᴋ\n🛈🛆-🛄🛅ᴋ: 🛅ᴋ\n🛄🛆-🛀🛀ᴋ: 🛇ᴋ\n🛀🛀🛇-🛈🛅🛀ᴋ: 🛇🛀ᴋ\n🛈🛅🛇-🛉🛀ᴋ: 🛇🛅ᴋ\n🛉🛀🛇-🛄🛀ᴋ: 🛈🛀ᴋ\nʙᴛ/ᴛᴛ❌\n...ᴅᴀɴ sᴇᴛᴇʀᴜsɴʏᴀ!!\nᴛʀx ʙᴀᴛᴀʟ ғᴇᴇ ᴛᴇᴛᴇᴘ ᴋᴇᴘᴏᴛᴏɴɢ!", popupLink: ""
};

const DEFAULT_BIOLINK_LINKS = [
    { title: "WARJOK TERBUKA ZURRA STORE", desc: "Grup resmi interaksi joki open kontak", type: "wa-group", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" },
    { title: "CH INFORMATION ZURRA", desc: "Saluran info update tools dan sistem", type: "wa-channel", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" },
    { title: "CH TESTI ZURRA STORE", desc: "Kumpulan real testimony pembeli jasa", type: "telegram", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" }
];

// ============================================================
//  FUNGSI UTAMA
// ============================================================
let cachedData = null;

// Ambil semua data dari JSONBin
async function fetchAllData() {
    try {
        const res = await fetch(BASE_URL, {
            headers: { 'X-Master-Key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        cachedData = json.record || {};
        // Pastikan semua properti ada
        if (!cachedData.products) cachedData.products = DEFAULT_PRODUCTS;
        if (!cachedData.partners) cachedData.partners = DEFAULT_PARTNERS;
        if (!cachedData.tools) cachedData.tools = DEFAULT_TOOLS;
        if (!cachedData.biolinkConfig) cachedData.biolinkConfig = DEFAULT_BIOLINK_CONFIG;
        if (!cachedData.biolinkLinks) cachedData.biolinkLinks = DEFAULT_BIOLINK_LINKS;
        return cachedData;
    } catch (e) {
        console.error('fetchAllData error:', e);
        // fallback ke default
        return {
            products: DEFAULT_PRODUCTS,
            partners: DEFAULT_PARTNERS,
            tools: DEFAULT_TOOLS,
            biolinkConfig: DEFAULT_BIOLINK_CONFIG,
            biolinkLinks: DEFAULT_BIOLINK_LINKS
        };
    }
}

// Simpan seluruh data ke JSONBin (overwrite)
async function saveAllData(data) {
    try {
        const res = await fetch(BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        cachedData = data;
        return true;
    } catch (e) {
        console.error('saveAllData error:', e);
        return false;
    }
}

// ============================================================
//  FUNGSI AKSES PER BAGIAN (untuk memudahkan)
// ============================================================
async function getProducts() {
    if (!cachedData) await fetchAllData();
    return cachedData.products || DEFAULT_PRODUCTS;
}

async function getPartners() {
    if (!cachedData) await fetchAllData();
    return cachedData.partners || DEFAULT_PARTNERS;
}

async function getTools() {
    if (!cachedData) await fetchAllData();
    return cachedData.tools || DEFAULT_TOOLS;
}

async function getBiolinkConfig() {
    if (!cachedData) await fetchAllData();
    return cachedData.biolinkConfig || DEFAULT_BIOLINK_CONFIG;
}

async function getBiolinkLinks() {
    if (!cachedData) await fetchAllData();
    return cachedData.biolinkLinks || DEFAULT_BIOLINK_LINKS;
}

// Fungsi simpan per bagian (ambil data terbaru, modifikasi, lalu saveAll)
async function saveProducts(products) {
    let data = await fetchAllData();
    data.products = products;
    return await saveAllData(data);
}

async function savePartners(partners) {
    let data = await fetchAllData();
    data.partners = partners;
    return await saveAllData(data);
}

async function saveTools(tools) {
    let data = await fetchAllData();
    data.tools = tools;
    return await saveAllData(data);
}

async function saveBiolinkConfig(config) {
    let data = await fetchAllData();
    data.biolinkConfig = config;
    return await saveAllData(data);
}

async function saveBiolinkLinks(links) {
    let data = await fetchAllData();
    data.biolinkLinks = links;
    return await saveAllData(data);
}
