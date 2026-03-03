export const generateWhatsAppLink = (service?: string) => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
    let text = 'Hello, I want to book a car service.';

    if (service) {
        text = `Hello, I want to book the *${service}*.

Car Model: 
Location: 
Preferred Date: `;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
