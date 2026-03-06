import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const ContactScreen = () => {
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-2">We Are Here For You</p>
                    <h1 className="text-5xl font-serif font-bold text-primary mb-4 tracking-wide">Contact Us</h1>
                    <p className="text-gray-500 text-lg">We'd love to hear from you</p>
                    <div className="h-0.5 w-24 bg-secondary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Form */}
                    <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-secondary/10">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send us a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Name</label>
                                <input type="text" className="w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:outline-none focus:border-primary transition-colors bg-amber-50/20" placeholder="Aapka Naam" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone / WhatsApp</label>
                                <input type="tel" className="w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:outline-none focus:border-primary transition-colors bg-amber-50/20" placeholder="+91 XXXXXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                <input type="email" className="w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:outline-none focus:border-primary transition-colors bg-amber-50/20" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 border-2 border-secondary/20 rounded-lg focus:outline-none focus:border-primary transition-colors bg-amber-50/20" placeholder="Aapka message..."></textarea>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-lg font-bold tracking-widest hover:bg-[#6b0000] transition-all duration-300 uppercase shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        {[
                            { Icon: FaPhone, title: 'Call / WhatsApp', info: '+91 8209224452', sub: 'Mon–Sat · 10am to 7pm IST', color: 'text-primary' },
                            { Icon: FaWhatsapp, title: 'WhatsApp Order', info: '+91 8209224452', sub: 'Send us a message for custom orders', color: 'text-green-600' },
                            { Icon: FaEnvelope, title: 'Email Us', info: 'support@shringar.in', sub: 'We reply within 24 hours', color: 'text-primary' },
                            { Icon: FaMapMarkerAlt, title: 'Visit Our Store', info: 'Johari Bazaar, Jaipur, Rajasthan — 302003', sub: 'India\'s Jewellery Capital 💎', color: 'text-red-600' },
                        ].map(({ Icon, title, info, sub, color }, i) => (
                            <div key={i} className="flex items-start gap-6 bg-white p-6 rounded-2xl border-2 border-secondary/10 shadow-sm hover:border-secondary transition-colors">
                                <div className="bg-secondary/10 p-4 rounded-full flex-shrink-0">
                                    <Icon size={22} className={color} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1 font-serif">{title}</h4>
                                    <p className="text-gray-700 font-medium">{info}</p>
                                    <p className="text-gray-400 text-xs mt-1">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
