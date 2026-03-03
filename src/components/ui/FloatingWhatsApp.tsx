import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../../lib/whatsapp';

export default function FloatingWhatsApp() {
    return (
        <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
            aria-label="Chat with us on WhatsApp"
        >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-[&:hover]:animate-none transition-all duration-300"></div>
            <div className="relative bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                <MessageCircle size={28} className="fill-current" />
            </div>
        </a>
    );
}
