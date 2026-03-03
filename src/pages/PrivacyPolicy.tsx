import { SEO } from '../components/SEO';

export default function PrivacyPolicy() {
    return (
        <>
            <SEO title="Privacy Policy" description="ProAuto Privacy Policy" canonicalUrl="https://proauto.com/privacy" />
            <div className="pt-32 pb-24 bg-brand-900 min-h-screen text-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                    <div className="space-y-6">
                        <p>Last updated: October 2023</p>
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
                        <p>At ProAuto, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you book a service, contact customer support, or subscribe to our newsletter. This may include your name, email address, phone number, vehicle details, and payment information.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and send you technical notices and support messages.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. WhatsApp Communications</h2>
                        <p>By using our WhatsApp booking feature, you consent to receiving communications regarding your service appointment via WhatsApp.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
