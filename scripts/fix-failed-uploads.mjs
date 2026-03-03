#!/usr/bin/env node
// Fix script for the 9 failed uploads — using alternative URLs

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FIXES = [
    { id: 'services/oil-change', url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200' },
    { id: 'services/brake-fluid', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'services/brake-pad', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'services/roadside-assistance', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200' },
    { id: 'services/fuel-delivery', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200' },
    { id: 'services-preview/brake-service', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'gallery/premium-oil-change', url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200' },
    { id: 'gallery/brake-replacement', url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200' },
    { id: 'testimonials/priya-m', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
];

async function main() {
    console.log(`\n🔧 Fixing ${FIXES.length} failed uploads...\n`);
    let ok = 0, fail = 0;

    for (const item of FIXES) {
        try {
            const r = await cloudinary.uploader.upload(item.url, {
                public_id: item.id, overwrite: true, resource_type: 'image',
            });
            console.log(`✅ ${item.id}  (${(r.bytes / 1024).toFixed(1)} KB)`);
            ok++;
        } catch (err) {
            console.error(`❌ ${item.id}  →  ${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 Fixed: ${ok}, Still failing: ${fail}\n`);
}

main();
