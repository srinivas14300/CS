import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

export default function NotFound() {
    return (
        <>
            <SEO title="Page Not Found" description="The page you are looking for does not exist." />
            <div className="min-h-screen bg-brand-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-9xl font-black text-accent-red mb-4"
                    >
                        404
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-white mb-6"
                    >
                        Page Not Found
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-md mx-auto mb-8"
                    >
                        The page you're looking for was moved, removed, renamed, or might never have existed.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link to="/">
                            <Button size="lg">Return Home</Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
