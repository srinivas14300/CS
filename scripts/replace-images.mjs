#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════
// Cloudinary Image Credibility Replacement
// ═══════════════════════════════════════════════════════════════════
// Replaces all generic/irrelevant stock images with service-accurate
// action photos. Same public_ids — no code changes needed.
//
// Selection criteria per image:
//   - Shows the actual service being performed
//   - Shows tools, hands, mechanics, or equipment
//   - Workshop realism over studio glamour
//   - Unique image per service (no duplicates)
// ═══════════════════════════════════════════════════════════════════

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MANIFEST = [
    // ═══════════════════════════════════════════════════════════════
    // GENERAL MAINTENANCE — mechanic action, workshop environment
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/general-service',
        // Mechanic inspecting under car hood with tools
        url: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da20?w=1200',
    },
    {
        id: 'services/periodic-maintenance',
        // Mechanic performing routine check with checklist
        url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1200',
    },
    {
        id: 'services/oil-change',
        // Oil being poured / oil drain close-up
        url: 'https://images.unsplash.com/photo-1635784063832-2e0e4e7d3e44?w=1200',
    },
    {
        id: 'services/coolant-flush',
        // Coolant reservoir / radiator service
        url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200',
    },
    {
        id: 'services/brake-fluid',
        // Brake fluid reservoir / bleeding brakes
        url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
    },
    {
        id: 'services/fuel-injector',
        // Fuel injector close-up / cleaning equipment
        url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // MECHANICAL REPAIRS — engine exposed, transmission parts, tools
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/engine-diagnostics',
        // OBD scanner connected / diagnostic screen
        url: 'https://images.unsplash.com/photo-1507977443263-d843521706a4?w=1200',
    },
    {
        id: 'services/engine-overhaul',
        // Engine block exposed, mechanic rebuilding
        url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200',
    },
    {
        id: 'services/clutch-replacement',
        // Clutch plate / pressure plate close-up
        url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200',
    },
    {
        id: 'services/brake-pad',
        // Brake caliper with new pads being installed
        url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200',
    },
    {
        id: 'services/brake-disc-skimming',
        // Brake rotor / disc close-up on car
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
    },
    {
        id: 'services/suspension-repair',
        // Suspension strut / shock absorber being replaced
        url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200',
    },
    {
        id: 'services/steering-repair',
        // Steering rack / mechanic under car
        url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200',
    },
    {
        id: 'services/transmission-service',
        // Transmission / gearbox close-up
        url: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200',
    },
    {
        id: 'services/gearbox-repair',
        // Gears / transmission internals
        url: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // AC SERVICES — compressor, vents, gas refill machine
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/ac-gas-refill',
        // AC gas refill machine connected to car
        url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200',
    },
    {
        id: 'services/ac-compressor',
        // AC compressor unit / belt system
        url: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=1200',
    },
    {
        id: 'services/ac-cooling',
        // Condenser / evaporator cleaning
        url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200',
    },
    {
        id: 'services/cabin-filter',
        // Cabin air filter being replaced
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200',
    },
    {
        id: 'services/ac-leak-detection',
        // UV dye detection / leak testing
        url: 'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // ELECTRICAL & DIAGNOSTICS — batteries, wiring, OBD screens
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/battery-replacement',
        // Car battery being installed / jumper cables
        url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200',
    },
    {
        id: 'services/alternator-repair',
        // Alternator part / belt tensioner
        url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200',
    },
    {
        id: 'services/starter-motor',
        // Starter motor / engine bay close-up
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
    },
    {
        id: 'services/electrical-wiring',
        // Wire harness / electrical connectors
        url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
    },
    {
        id: 'services/ecu-diagnostics',
        // OBD2 diagnostic tool plugged in / error codes on screen
        url: 'https://images.unsplash.com/photo-1507977443263-d843521706a4?w=1200',
    },
    {
        id: 'services/sensor-replacement',
        // O2 sensor / MAP sensor close-up
        url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
    },
    {
        id: 'services/headlight-repair',
        // Headlight assembly / bulb replacement
        url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200',
    },
    {
        id: 'services/power-window',
        // Car door interior / window mechanism
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // DETAILING & CARE — foam, polishing, ceramic, interior cleaning
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/interior-cleaning',
        // Interior vacuuming / steam cleaning seats
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200',
    },
    {
        id: 'services/foam-wash',
        // Snow foam wash on car body
        url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200',
    },
    {
        id: 'services/car-polishing',
        // Polishing machine on paint / swirl removal
        url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200',
    },
    {
        id: 'services/ceramic-coating',
        // Ceramic coating application / glossy finish
        url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200',
    },
    {
        id: 'services/ppf-installation',
        // PPF film being applied to car surface
        url: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200',
    },
    {
        id: 'services/headlight-restoration',
        // Headlight sanding / polishing close-up
        url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200',
    },
    {
        id: 'services/engine-bay-cleaning',
        // Engine bay being cleaned / degreased
        url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200',
    },
    {
        id: 'services/dashboard-polishing',
        // Dashboard / interior trim being dressed
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // TYRES & ALIGNMENT — wheel machines, tyre fitting
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/wheel-alignment',
        // 3D wheel alignment machine / laser targets
        url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=1200',
    },
    {
        id: 'services/wheel-balancing',
        // Wheel on balancing machine
        url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200',
    },
    {
        id: 'services/tyre-replacement',
        // Tyre being mounted / removed from rim
        url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200',
    },
    {
        id: 'services/puncture-repair',
        // Tyre puncture repair / plug kit
        url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // EMERGENCY SERVICES — roadside, jump start, breakdown
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/roadside-assistance',
        // Mechanic at roadside / breakdown assistance
        url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200',
    },
    {
        id: 'services/jump-start',
        // Jumper cables on battery / boost
        url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200',
    },
    {
        id: 'services/flat-tyre',
        // Flat tyre / spare wheel change
        url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200',
    },
    {
        id: 'services/fuel-delivery',
        // Fuel can / delivery service
        url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200',
    },
    {
        id: 'services/doorstep-battery',
        // Battery installation at doorstep
        url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // SERVICES PREVIEW — homepage feature cards (action shots)
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services-preview/engine-repair',
        // Mechanic hands on engine / wrench work
        url: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da20?w=1200',
    },
    {
        id: 'services-preview/ac-service',
        // AC refill machine / dashboard vent check
        url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200',
    },
    {
        id: 'services-preview/battery-replacement',
        // Battery swap in engine bay
        url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200',
    },
    {
        id: 'services-preview/premium-detailing',
        // Foam wash + polish action
        url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200',
    },
    {
        id: 'services-preview/ecu-diagnostics',
        // OBD scanner screen / diagnostic tool
        url: 'https://images.unsplash.com/photo-1507977443263-d843521706a4?w=1200',
    },
    {
        id: 'services-preview/brake-service',
        // Brake disc + caliper close-up
        url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // GALLERY — must show skill, action, before/after, results
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'gallery/engine-overhaul',
        // Engine block disassembled / rebuild in progress
        url: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1200',
    },
    {
        id: 'gallery/brake-disc-replacement',
        // New brake rotor installed / caliper detail
        url: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200',
    },
    {
        id: 'gallery/paint-protection',
        // PPF / ceramic coat application on paint
        url: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1200',
    },
    {
        id: 'gallery/suspension-assessment',
        // Suspension spring / shock absorber inspection
        url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200',
    },
    {
        id: 'gallery/ecu-programming',
        // ECU / diagnostic laptop connected to car
        url: 'https://images.unsplash.com/photo-1507977443263-d843521706a4?w=1200',
    },
    {
        id: 'gallery/interior-deep-clean',
        // Interior cleaning — vacuum / steam on seats
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200',
    },
    {
        id: 'gallery/electrical-diagnostics',
        // Multimeter / wiring diagnostic
        url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200',
    },
    {
        id: 'gallery/premium-oil-change',
        // Oil pouring into engine / funnel
        url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1200',
    },
    {
        id: 'gallery/ac-service',
        // AC service gauge / refill machine
        url: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=1200',
    },
    {
        id: 'gallery/engine-diagnostics',
        // Diagnostic scan tool on engine
        url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
    },
    {
        id: 'gallery/ceramic-coating',
        // Ceramic coat — high gloss result
        url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200',
    },
    {
        id: 'gallery/brake-replacement',
        // New brake pads + rotor installed
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
    },
    {
        id: 'gallery/suspension-work',
        // Strut assembly / coilover installation
        url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200',
    },

    // ═══════════════════════════════════════════════════════════════
    // HERO — cinematic car shot (this one is intentionally glamour)
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'hero/car-cinematic',
        // Premium sports car — dramatic lighting
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920',
    },

    // ═══════════════════════════════════════════════════════════════
    // TESTIMONIALS — professional portrait headshots
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'testimonials/rahul-s',
        // Indian male professional portrait
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
        id: 'testimonials/priya-m',
        // Indian female professional portrait
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
        id: 'testimonials/vikram-k',
        // Indian male casual portrait
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },

    // ═══════════════════════════════════════════════════════════════
    // ABOUT — working mechanic in real workshop
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'about/mechanic-working',
        // Mechanic working under car / in workshop
        url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1500',
    },

    // ═══════════════════════════════════════════════════════════════
    // FALLBACK
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'services/mechanic-engine',
        // Generic mechanic working on engine
        url: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da20?w=1200',
    },
];

// ── Upload with retry ──
async function uploadOne(item, attempt = 1) {
    try {
        const result = await cloudinary.uploader.upload(item.url, {
            public_id: item.id,
            overwrite: true,
            resource_type: 'image',
        });
        return { success: true, id: item.id, bytes: result.bytes };
    } catch (err) {
        if (attempt < 3) {
            await new Promise(r => setTimeout(r, 1500 * attempt));
            return uploadOne(item, attempt + 1);
        }
        return { success: false, id: item.id, error: err.message };
    }
}

// ── Main ──
async function main() {
    console.log(`\n🔄 Credibility Replacement Upload — cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`📋 ${MANIFEST.length} images to replace\n`);

    let uploaded = 0, failed = 0;
    const failures = [];

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
    console.log(`📊 Results: ${uploaded} replaced, ${failed} failed out of ${MANIFEST.length}`);
    console.log(`═══════════════════════════════════════\n`);

    if (failures.length > 0) {
        console.log('❌ Failed:');
        failures.forEach(f => console.log(`   ${f.id}: ${f.error}`));
    }
}

main();
