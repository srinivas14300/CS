import { Hero } from '../components/home/Hero';
import { BrandsMarquee } from '../components/home/BrandsMarquee';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { Testimonials } from '../components/home/Testimonials';
import { CtaSection } from '../components/home/CtaSection';
import { GuaranteeBanner } from '../components/home/GuaranteeBanner';
import { SEO } from '../components/SEO';

export default function Home() {
    return (
        <>
            <SEO
                title="Car Sales & Services"
                description="Experience absolute precision with ProAuto. service, and maintenance engineered for luxury and reliability."
                canonicalUrl="https://proauto.com"
            />
            <Hero />
            <GuaranteeBanner />
            <BrandsMarquee />
            <ServicesPreview />
            <WhyChooseUs />
            <ProcessTimeline />
            <GalleryPreview />
            <Testimonials />
            <CtaSection />
        </>
    );
}
