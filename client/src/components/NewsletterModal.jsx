import { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NewsletterModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // 5 seconds delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('newsletterPopupSeen', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Welcome to the Inner Circle! Exclusive deals are on their way.");
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative animate-slide-up">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <div className="p-10 text-center">
                    <div className="w-16 h-16 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaEnvelope size={24} />
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 tracking-tight">Elegance in Your Inbox</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">Join our Inner Circle and receive 10% off your next purchase, plus early access to new collections.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            required
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:border-gold-500 transition-all text-center"
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-lg"
                        >
                            Get My Discount
                        </button>
                    </form>

                    <button
                        onClick={handleClose}
                        className="mt-6 text-xs text-gray-400 hover:text-gray-600 uppercase tracking-widest font-bold border-b border-transparent hover:border-gray-300 pb-1"
                    >
                        No thanks, I'll pay full price
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;
