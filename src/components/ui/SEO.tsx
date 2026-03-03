import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
}

export function SEO({ title, description, name = "ProAuto Service", type = "website" }: SEOProps) {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{`${title} | ${name}`}</title>
            <meta name='description' content={description} />

            {/* OpenGraph tags for social sharing */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter Card tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
