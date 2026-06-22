// ============================================================
//  KONFIGURASI FIREBASE
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvkTdNqm_oqC9HW3wO716stVJdUGJbJIo",
    authDomain: "website-gw.firebaseapp.com",
    databaseURL: "https://website-gw-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "website-gw",
    storageBucket: "website-gw.firebasestorage.app",
    messagingSenderId: "205735340945",
    appId: "1:205735340945:web:6d4bfcce48fe4bd9c78830",
    measurementId: "G-NLYCPLTK54"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================================
//  DATA DEFAULT
// ============================================================
export const DEFAULT_PRODUCTS = [
    { id: 1, name: "Kelas / Jasa Bug Spammer", price: "Rp 5.000 / 14.000", image: "", demoUrl: "", isOpen: true, benefits: ["Diajarin trik bug tanpa panel", "Anti-banned sistem Cyber", "Target Spammer/Ripper Bebas", "Open Jasa Komersial Sendiri"] },
    { id: 2, name: "Web Payment / Biolink", price: "Rp 5.000 - 15.000", image: "", demoUrl: "https://nefu.life", isOpen: true, benefits: ["Design Luxury Corporate", "Full Rename & Custom Logo", "Sistem Pop-up Download QRIS", "Free Maintenance 10 Hari"] }
];

export const DEFAULT_PARTNERS = [
    { name: "Siff Store", role: "Main Partner & Developer Support", avatar: "https://nefu.life/0_ZoEH.jpg", telegram: "https://t.me/ALLSANS62" },
    { name: "Eka Store", role: "Reseller & Partner Resmi", avatar: "https://nefu.life/0_ZoEH.jpg", telegram: "https://t.me/ALLSANS62" }
];

export const DEFAULT_TOOLS = [
    { name: "Spammer Tools", desc: "Kirim spam pesan instan tanpa delay untuk pengujian server.", url: "#", isActive: true },
    { name: "Link Creator", desc: "Bikin tautan kustom pendek secara otomatis.", url: "#", isActive: true }
];

export const DEFAULT_BIOLINK_CONFIG = {
    bio: "Kalian nyari grub joki kontak terbuka?, sung join dibawah (Contoh doang bre) YANG MAU ORDER WEBSITENYA LANGSUNG",
    bgImage: "", whatsapp: "https://wa.me/6285789884293", tiktok: "#", instagram: "#", youtube: "#", email: "mailto:admin@zurra.store",
    popupText: "Zurra Store Melayani:\n• Jaspost Free Ke PM\n• MC/Rekber \n\nList Fee MC/Rekber:\n1-10k: 1k\n10-50k: 5k\n50-100k: 10k\n100-500k: 25k\n500-1jt: 50k\n1jt-5jt: 100k\n5jt-10jt: 250k\n10jt-50jt: 500k\nBT/TT❌\n...dan seterusnya!!\nTRX BATAL FEE TETAP KEPOTONG!",
    popupLink: ""
};

export const DEFAULT_BIOLINK_LINKS = [
    { title: "WARJOK TERBUKA ZURRA STORE", desc: "Grup resmi interaksi joki open kontak", type: "wa-group", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" },
    { title: "CH INFORMATION ZURRA", desc: "Saluran info update tools dan sistem", type: "wa-channel", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" },
    { title: "CH TESTI ZURRA STORE", desc: "Kumpulan real testimony pembeli jasa", type: "telegram", url: "https://t.me/ALLSANS62", avatar: "https://nefu.life/0_ZoEH.jpg" }
];

// ============================================================
//  FUNGSI UTAMA
// ============================================================
let cachedData = null;

export async function fetchAllData() {
    try {
        console.log('📡 Fetching data from Firebase...');
        const snapshot = await get(child(ref(db), '/'));
        if (snapshot.exists()) {
            cachedData = snapshot.val();
            console.log('✅ Data fetched successfully');
            if (!cachedData.products) cachedData.products = DEFAULT_PRODUCTS;
            if (!cachedData.partners) cachedData.partners = DEFAULT_PARTNERS;
            if (!cachedData.tools) cachedData.tools = DEFAULT_TOOLS;
            if (!cachedData.biolinkConfig) cachedData.biolinkConfig = DEFAULT_BIOLINK_CONFIG;
            if (!cachedData.biolinkLinks) cachedData.biolinkLinks = DEFAULT_BIOLINK_LINKS;
            return cachedData;
        } else {
            console.log('📭 Database kosong, menyimpan default...');
            cachedData = {
                products: DEFAULT_PRODUCTS,
                partners: DEFAULT_PARTNERS,
                tools: DEFAULT_TOOLS,
                biolinkConfig: DEFAULT_BIOLINK_CONFIG,
                biolinkLinks: DEFAULT_BIOLINK_LINKS
            };
            await set(ref(db), cachedData);
            console.log('✅ Default data saved to Firebase');
            return cachedData;
        }
    } catch (e) {
        console.error('❌ fetchAllData error:', e);
        return {
            products: DEFAULT_PRODUCTS,
            partners: DEFAULT_PARTNERS,
            tools: DEFAULT_TOOLS,
            biolinkConfig: DEFAULT_BIOLINK_CONFIG,
            biolinkLinks: DEFAULT_BIOLINK_LINKS
        };
    }
}

async function saveAllData(data) {
    try {
        console.log('💾 Saving data to Firebase...');
        await set(ref(db), data);
        console.log('✅ Save successful');
        cachedData = data;
        return true;
    } catch (e) {
        console.error('❌ saveAllData error:', e);
        return false;
    }
}

export async function saveProducts(products) {
    let data = await fetchAllData();
    data.products = products;
    return await saveAllData(data);
}
export async function savePartners(partners) {
    let data = await fetchAllData();
    data.partners = partners;
    return await saveAllData(data);
}
export async function saveTools(tools) {
    let data = await fetchAllData();
    data.tools = tools;
    return await saveAllData(data);
}
export async function saveBiolinkConfig(config) {
    let data = await fetchAllData();
    data.biolinkConfig = config;
    return await saveAllData(data);
}
export async function saveBiolinkLinks(links) {
    let data = await fetchAllData();
    data.biolinkLinks = links;
    return await saveAllData(data);
}
