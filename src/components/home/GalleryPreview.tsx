import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRef } from 'react';
import { galleryUrl, srcSet, GALLERY_SIZES } from '../../lib/cloudinary';

const galleryItems = [
    {
        id: 1,
        image: 'gallery/engine-diagnostics',
        title: 'Engine Diagnostics',
        category: 'Repair'
    },
    {
        id: 2,
        image: 'gallery/ceramic-coating',
        title: 'Ceramic Coating',
        category: 'Detailing'
    },
    {
        id: 3,
        image: 'gallery/brake-replacement',
        title: 'Brake Replacement',
        category: 'Maintenance'
    },
    {
        id: 4,
        image: 'gallery/suspension-work',
        title: 'Suspension Work',
        category: 'Repair'
    }
];

export function GalleryPreview() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <section className="py-20 overflow-hidden">
            <div className="container">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="block text-base text-accent-red font-semibold mb-2 tracking-wider uppercase">Our Gallery</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Explore Our Work</h2>
                    </div>
                    <Button variant="outline" size="lg">
                        View All <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="relative overflow-hidden rounded-lg shadow-lg group"
                            style={{ y: index % 2 === 0 ? y : undefined }} // Apply parallax to even items
                        >
                            <img
                                src={galleryUrl(item.image)}
                                srcSet={srcSet(item.image)}
                                sizes={GALLERY_SIZES}
                                alt={item.title}
                                width={800}
                                height={256}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                <Button variant="primary" className="rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                    <Eye className="w-4 h-4" />
                                    <span>View Project</span>
                                </Button>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <p className="text-accent-red text-xs font-semibold mb-1 uppercase tracking-widest">{item.category}</p>
                                <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
