#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════
// Cloudinary Bulk Upload — from stock photo URLs
// ═══════════════════════════════════════════════════════════════════
// Uploads high-quality automotive stock photos directly to Cloudinary
// with the exact public_id structure expected by the frontend.
// ═══════════════════════════════════════════════════════════════════

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error('❌ Missing credentials in .env');
    process.exit(1);
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

// ── Stock photo URL mappings ──
// Using Unsplash source URLs (free, high-quality, no auth needed)
const MANIFEST = [
    // ═══ services/ (45 images) ═══
    // General Maintenance
    { id: 'services/general-service', url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200' },
    { id: 'services/periodic-maintenance', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200' },
    { id: 'services/oil-change', url: 'https://images.unsplash.com/photo-1635784063832-2e0e4e7d3e44?w=1200' },
    { id: 'services/coolant-flush', url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200' },
    { id: 'services/brake-fluid', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200' },
    { id: 'services/fuel-injector', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200' },

    // Mechanical Repairs
    { id: 'services/engine-diagnostics', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },
    { id: 'services/engine-overhaul', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200' },
    { id: 'services/clutch-replacement', url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200' },
    { id: 'services/brake-pad', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200' },
    { id: 'services/brake-disc-skimming', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'services/suspension-repair', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200' },
    { id: 'services/steering-repair', url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200' },
    { id: 'services/transmission-service', url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200' },
    { id: 'services/gearbox-repair', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200' },

    // AC Services
    { id: 'services/ac-gas-refill', url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200' },
    { id: 'services/ac-compressor', url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200' },
    { id: 'services/ac-cooling', url: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=1200' },
    { id: 'services/cabin-filter', url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200' },
    { id: 'services/ac-leak-detection', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },

    // Electrical & Diagnostics
    { id: 'services/battery-replacement', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200' },
    { id: 'services/alternator-repair', url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1200' },
    { id: 'services/starter-motor', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200' },
    { id: 'services/electrical-wiring', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200' },
    { id: 'services/ecu-diagnostics', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },
    { id: 'services/sensor-replacement', url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1200' },
    { id: 'services/headlight-repair', url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200' },
    { id: 'services/power-window', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200' },

    // Detailing & Care
    { id: 'services/interior-cleaning', url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200' },
    { id: 'services/foam-wash', url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200' },
    { id: 'services/car-polishing', url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200' },
    { id: 'services/ceramic-coating', url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200' },
    { id: 'services/ppf-installation', url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200' },
    { id: 'services/headlight-restoration', url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200' },
    { id: 'services/engine-bay-cleaning', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200' },
    { id: 'services/dashboard-polishing', url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200' },

    // Tyres & Alignment
    { id: 'services/wheel-alignment', url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=1200' },
    { id: 'services/wheel-balancing', url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=1200' },
    { id: 'services/tyre-replacement', url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200' },
    { id: 'services/puncture-repair', url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200' },

    // Emergency Services
    { id: 'services/roadside-assistance', url: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?w=1200' },
    { id: 'services/jump-start', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200' },
    { id: 'services/flat-tyre', url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200' },
    { id: 'services/fuel-delivery', url: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5a8?w=1200' },
    { id: 'services/doorstep-battery', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200' },

    // ═══ services-preview/ (6 images) ═══
    { id: 'services-preview/engine-repair', url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200' },
    { id: 'services-preview/ac-service', url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200' },
    { id: 'services-preview/battery-replacement', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200' },
    { id: 'services-preview/premium-detailing', url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200' },
    { id: 'services-preview/ecu-diagnostics', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },
    { id: 'services-preview/brake-service', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200' },

    // ═══ gallery/ (13 images) ═══
    { id: 'gallery/engine-overhaul', url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200' },
    { id: 'gallery/brake-disc-replacement', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'gallery/paint-protection', url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200' },
    { id: 'gallery/suspension-assessment', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200' },
    { id: 'gallery/ecu-programming', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },
    { id: 'gallery/interior-deep-clean', url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200' },
    { id: 'gallery/electrical-diagnostics', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200' },
    { id: 'gallery/premium-oil-change', url: 'https://images.unsplash.com/photo-1635784063832-2e0e4e7d3e44?w=1200' },
    { id: 'gallery/ac-service', url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200' },
    { id: 'gallery/engine-diagnostics', url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200' },
    { id: 'gallery/ceramic-coating', url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200' },
    { id: 'gallery/brake-replacement', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200' },
    { id: 'gallery/suspension-work', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200' },

    // ═══ hero/ (1 image) ═══
    { id: 'hero/car-cinematic', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920' },

    // ═══ testimonials/ (3 images) ═══
    { id: 'testimonials/rahul-s', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { id: 'testimonials/priya-m', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400' },
    { id: 'testimonials/vikram-k', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },

    // ═══ about/ (1 image) ═══
    { id: 'about/mechanic-working', url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1500' },

    // ═══ fallback ═══
    { id: 'services/mechanic-engine', url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200' },
];

// ── Upload with retry ──
async function uploadOne(item, attempt = 1) {
    try {
        const result = await cloudinary.uploader.upload(item.url, {
            public_id: item.id,
            overwrite: true,
            resource_type: 'image',
        });
        return { success: true, id: item.id, bytes: result.bytes, url: result.secure_url };
    } catch (err) {
        if (attempt < 3) {
            await new Promise(r => setTimeout(r, 1000 * attempt));
            return uploadOne(item, attempt + 1);
        }
        return { success: false, id: item.id, error: err.message };
    }
}

// ── Main ──
async function main() {
    console.log(`\n☁️  Cloudinary Bulk Upload — cloud: ${CLOUDINARY_CLOUD_NAME}`);
    console.log(`📋 ${MANIFEST.length} images to upload from URLs\n`);

    let uploaded = 0, failed = 0;
    const failures = [];

    // Upload in batches of 5 for rate limiting
    for (let i = 0; i < MANIFEST.length; i += 5) {
        const batch = MANIFEST.slice(i, i + 5);
        const results = await Promise.all(batch.map(item => uploadOne(item)));

        for (const r of results) {
            if (r.success) {
                console.log(`✅ [${uploaded + 1}/${MANIFEST.length}] ${r.id}  (${(r.bytes / 1024).toFixed(1)} KB)`);
                uploaded++;
            } else {
                console.error(`❌ ${r.id}  →  ${r.error}`);
                failures.push(r);
                failed++;
            }
        }
    }

    console.log(`\n═══════════════════════════════════════`);
    console.log(`📊 Results: ${uploaded} uploaded, ${failed} failed out of ${MANIFEST.length}`);
    console.log(`═══════════════════════════════════════\n`);

    if (failures.length > 0) {
        console.log('❌ Failed uploads:');
        failures.forEach(f => console.log(`   ${f.id}: ${f.error}`));
    }
}

main();
