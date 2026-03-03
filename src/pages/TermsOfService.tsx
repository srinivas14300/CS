import { SEO } from '../components/SEO';

export default function TermsOfService() {
    return (
        <>
            <SEO title="Terms of Service" description="ProAuto Terms of Service" canonicalUrl="https://proauto.com/terms" />
            <div className="pt-32 pb-24 bg-brand-900 min-h-screen text-gray-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                    <div className="space-y-6">
                        <p>Last updated: October 2023</p>
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h2>
                        <p>By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Service Terms</h2>
                        <p>All services are subject to an initial inspection upon arrival. Final pricing may vary based on the specific condition of your vehicle and approval of any additional required parts or labor.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Cancellations</h2>
                        <p>Cancellations must be made at least 2 hours prior to the scheduled appointment time. Late cancellations may be subject to a nominal call-out fee.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Warranty</h2>
                        <p>We provide a 30-day warranty on all labor and parts supplied by ProAuto. This warranty does not cover parts supplied by the customer or damages caused by subsequent external factors.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
