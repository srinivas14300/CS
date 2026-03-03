import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { galleryUrl, srcSet, GALLERY_SIZES } from '../lib/cloudinary';

const galleryItems = [
    {
        image: 'gallery/engine-overhaul',
        title: 'Complete Engine Overhaul',
        category: 'Mechanical',
    },
    {
        image: 'gallery/brake-disc-replacement',
        title: 'Brake Disc Replacement',
        category: 'Maintenance',
    },
    {
        image: 'gallery/paint-protection',
        title: 'Paint Protection Film',
        category: 'Detailing',
    },
    {
        image: 'gallery/suspension-assessment',
        title: 'Suspension Assessment',
        category: 'Mechanical',
    },
    {
        image: 'gallery/ecu-programming',
        title: 'ECU Programming',
        category: 'Diagnostics',
    },
    {
        image: 'gallery/interior-deep-clean',
        title: 'Interior Deep Clean',
        category: 'Detailing',
    },
    {
        image: 'gallery/electrical-diagnostics',
        title: 'Electrical Diagnostics',
        category: 'Electrical',
    },
    {
        image: 'gallery/premium-oil-change',
        title: 'Premium Oil Change',
        category: 'Maintenance',
    },
    {
        image: 'gallery/ac-service',
        title: 'AC Service & Repair',
        category: 'Repair',
    },
];

const GALLERY_FALLBACK = 'gallery/engine-overhaul';

export default function Gallery() {
    return (
        <>
            <SEO
                title="Premium Service Gallery"
                description="View our portfolio of luxury car care. See the high-quality diagnostics, detailing, and mechanical repair we provide for all vehicles."
                canonicalUrl="https://proauto.com/gallery"
            />
            <div className="pt-20 bg-brand-900 min-h-screen">
                <div className="bg-brand-800 py-16 border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Our <span className="text-accent-red">Work</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            A visual showcase of our premium detailing, maintenance, and repair services.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-800 border border-gray-800"
                            >
                                <img
                                    src={galleryUrl(item.image)}
                                    srcSet={srcSet(item.image)}
                                    sizes={GALLERY_SIZES}
                                    alt={item.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.src = galleryUrl(GALLERY_FALLBACK) }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                    <span className="text-accent-red text-sm font-bold tracking-wider uppercase mb-1">{item.category}</span>
                                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
