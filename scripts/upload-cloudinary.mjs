#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════
// Cloudinary Bulk Upload Script
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   1. Fill in CLOUDINARY_API_SECRET in .env
//   2. Place source images in ./assets/<folder>/<name>.jpg
//   3. Run:  node scripts/upload-cloudinary.mjs
//
// Security:
//   - Reads credentials from .env (never hardcoded)
//   - .env is gitignored
//   - Frontend only uses CLOUD_NAME (no secrets exposed)
// ═══════════════════════════════════════════════════════════════════

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config(); // Load .env

// ── Validate env ──
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET ||
    CLOUDINARY_API_SECRET === 'your_actual_secret_here') {
    console.error('❌ Missing or placeholder credentials in .env');
    console.error('   Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
    process.exit(1);
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

// ═══════════════════════════════════════════════════════════════════
// Complete image manifest — every public_id the frontend references
// ═══════════════════════════════════════════════════════════════════

const MANIFEST = [
    // ── services/ (45 images) ──
    'services/general-service',
    'services/periodic-maintenance',
    'services/oil-change',
    'services/coolant-flush',
    'services/brake-fluid',
    'services/fuel-injector',
    'services/engine-diagnostics',
    'services/engine-overhaul',
    'services/clutch-replacement',
    'services/brake-pad',
    'services/brake-disc-skimming',
    'services/suspension-repair',
    'services/steering-repair',
    'services/transmission-service',
    'services/gearbox-repair',
    'services/ac-gas-refill',
    'services/ac-compressor',
    'services/ac-cooling',
    'services/cabin-filter',
    'services/ac-leak-detection',
    'services/battery-replacement',
    'services/alternator-repair',
    'services/starter-motor',
    'services/electrical-wiring',
    'services/ecu-diagnostics',
    'services/sensor-replacement',
    'services/headlight-repair',
    'services/power-window',
    'services/interior-cleaning',
    'services/foam-wash',
    'services/car-polishing',
    'services/ceramic-coating',
    'services/ppf-installation',
    'services/headlight-restoration',
    'services/engine-bay-cleaning',
    'services/dashboard-polishing',
    'services/wheel-alignment',
    'services/wheel-balancing',
    'services/tyre-replacement',
    'services/puncture-repair',
    'services/roadside-assistance',
    'services/jump-start',
    'services/flat-tyre',
    'services/fuel-delivery',
    'services/doorstep-battery',

    // ── services-preview/ (6 images) ──
    'services-preview/engine-repair',
    'services-preview/ac-service',
    'services-preview/battery-replacement',
    'services-preview/premium-detailing',
    'services-preview/ecu-diagnostics',
    'services-preview/brake-service',

    // ── gallery/ (13 images) ──
    'gallery/engine-overhaul',
    'gallery/brake-disc-replacement',
    'gallery/paint-protection',
    'gallery/suspension-assessment',
    'gallery/ecu-programming',
    'gallery/interior-deep-clean',
    'gallery/electrical-diagnostics',
    'gallery/premium-oil-change',
    'gallery/ac-service',
    'gallery/engine-diagnostics',
    'gallery/ceramic-coating',
    'gallery/brake-replacement',
    'gallery/suspension-work',

    // ── hero/ (1 image) ──
    'hero/car-cinematic',

    // ── testimonials/ (3 images) ──
    'testimonials/rahul-s',
    'testimonials/priya-m',
    'testimonials/vikram-k',

    // ── about/ (1 image) ──
    'about/mechanic-working',

    // ── fallback (referenced in onError handlers) ──
    'services/mechanic-engine',
];

// ── Resolve local file path for a public_id ──
// Searches: ./assets/<public_id>.jpg, .png, .webp, .jpeg
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const ASSETS_DIR = path.resolve('assets');

function findLocalFile(publicId) {
    for (const ext of EXTENSIONS) {
        const filePath = path.join(ASSETS_DIR, `${publicId}${ext}`);
        if (fs.existsSync(filePath)) return filePath;
    }
    return null;
}

// ── Upload logic ──
async function uploadAll() {
    console.log(`\n☁️  Cloudinary Bulk Upload — cloud: ${CLOUDINARY_CLOUD_NAME}`);
    console.log(`📁 Looking for source images in: ${ASSETS_DIR}`);
    console.log(`📋 Manifest: ${MANIFEST.length} images\n`);

    if (!fs.existsSync(ASSETS_DIR)) {
        console.error(`❌ Assets directory not found: ${ASSETS_DIR}`);
        console.error('   Create it and place images inside, e.g.:');
        console.error('   assets/services/general-service.jpg');
        console.error('   assets/gallery/engine-overhaul.jpg');
        process.exit(1);
    }

    let uploaded = 0;
    let skipped = 0;
    let failed = 0;

    for (const publicId of MANIFEST) {
        const localFile = findLocalFile(publicId);

        if (!localFile) {
            console.warn(`⚠️  SKIP (no local file): ${publicId}`);
            skipped++;
            continue;
        }

        try {
            const result = await cloudinary.uploader.upload(localFile, {
                public_id: publicId,
                overwrite: true,
                resource_type: 'image',
            });
            console.log(`✅ ${publicId}  →  ${result.secure_url}  (${(result.bytes / 1024).toFixed(1)} KB)`);
            uploaded++;
        } catch (err) {
            console.error(`❌ FAIL: ${publicId}  →  ${err.message}`);
            failed++;
        }
    }

    console.log(`\n═══════════════════════════════════════`);
    console.log(`📊 Results: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`);
    console.log(`═══════════════════════════════════════\n`);

    if (skipped > 0) {
        console.log('💡 Skipped images need source files in ./assets/<folder>/<name>.(jpg|png|webp)');
    }
}

uploadAll();
