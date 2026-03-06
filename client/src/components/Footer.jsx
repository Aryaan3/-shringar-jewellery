import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1a0a0a] text-white pt-20 pb-10 border-t-4 border-secondary">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/">
                            <h3 className="text-secondary font-serif text-3xl font-bold mb-1 tracking-widest uppercase" style={{ color: '#D4AF37' }}>Shringar</h3>
                            <p className="text-secondary/70 text-xs tracking-[0.3em] mb-4">The World of Indian Jewellery</p>
                        </Link>
                        <p className="text-gray-400 text-sm leading-loose">
                            India's trusted destination for premium artificial jewellery. Celebrating the timeless beauty of Kundan, Meenakari, and traditional Indian craftsmanship.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {[FaInstagram, FaFacebook, FaWhatsapp, FaYoutube].map((Icon, idx) => (
                                <a key={idx} href="#" className="text-gray-400 hover:text-secondary transition-all transform hover:-translate-y-1 text-xl">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Collections */}
                    <div>
                        <h4 className="text-base font-bold mb-6 uppercase tracking-widest" style={{ color: '#D4AF37' }}>Collections</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/search/necklaces" className="hover:text-secondary transition-colors italic">Kundan & Polki Haar</Link></li>
                            <li><Link to="/search/jhumka" className="hover:text-secondary transition-colors italic">Jhumka & Chandbali</Link></li>
                            <li><Link to="/search/bangles" className="hover:text-secondary transition-colors italic">Bangles & Kadas</Link></li>
                            <li><Link to="/search/bridal" className="hover:text-secondary transition-colors italic">Bridal Shringar Sets</Link></li>
                            <li><Link to="/search/temple" className="hover:text-secondary transition-colors italic">Temple Jewellery</Link></li>
                            <li><Link to="/search/maang tikka" className="hover:text-secondary transition-colors italic">Maang Tikka & Matha Patti</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-base font-bold mb-6 uppercase tracking-widest" style={{ color: '#D4AF37' }}>Support</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/profile" className="hover:text-secondary transition-colors italic">My Account</Link></li>
                            <li><Link to="/cart" className="hover:text-secondary transition-colors italic">Shopping Cart</Link></li>
                            <li><Link to="/about" className="hover:text-secondary transition-colors italic">Our Story</Link></li>
                            <li><Link to="/contact" className="hover:text-secondary transition-colors italic">Contact Us</Link></li>
                            <li><Link to="/terms" className="hover:text-secondary transition-colors italic">Shipping & Returns</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-base font-bold mb-6 uppercase tracking-widest" style={{ color: '#D4AF37' }}>Connect With Us</h4>
                        <div className="text-sm text-gray-400 mb-6 space-y-4">
                            <p className="flex items-start gap-3">
                                <span className="text-secondary font-bold mt-0.5">📞</span>
                                <span>+91 8209224452<br /><span className="text-xs text-gray-500">Mon–Sat, 10am–7pm IST</span></span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-secondary font-bold mt-0.5">📧</span>
                                <span>support@shringar.in</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-secondary font-bold mt-0.5">📍</span>
                                <span>Johari Bazaar, Jaipur, Rajasthan — 302003</span>
                            </p>
                        </div>
                        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 text-center">
                            <p className="text-secondary text-xs font-bold tracking-widest">UPI • COD • Net Banking</p>
                            <p className="text-gray-500 text-xs mt-1">100% Secure Payments</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        © {new Date().getFullYear()} Shringar · Jaipur, India · All Rights Reserved
                    </p>
                    <p className="text-xs text-gray-600 italic">
                        "Zever Nahi, Ek Ehsaas Hai" — It's not just jewellery, it's a feeling.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
