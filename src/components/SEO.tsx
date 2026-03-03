import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
}

export function SEO({
    title,
    description,
    keywords = 'Car Sales & Services, auto repair, car care, luxury auto service',
    canonicalUrl = 'https://proauto.com',
    ogImage = 'https://proauto.com/og-image.jpg'
}: SEOProps) {
    const fullTitle = `${title} | ProAuto Premium Care`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "ProAuto Premium Care",
        "image": ogImage,
        "url": "https://proauto.com",
        "telephone": "+919876543210",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Auto Avenue",
            "addressLocality": "Motor City",
            "addressRegion": "MC",
            "postalCode": "45678",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.0760,
            "longitude": 72.8777
        }
    };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* OpenGraph / Social */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonicalUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
