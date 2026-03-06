import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Product from '../components/Product';
import { PRODUCTS_URL } from '../constants';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(PRODUCTS_URL);
                setProducts(data.products || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="text-center py-32">
            <div className="inline-block text-primary font-serif text-xl animate-pulse">Loading collections...</div>
        </div>
    );

    return (
        <div>
            <HeroCarousel />

            {/* Shop by Category - Indian categories */}
            <section className="mb-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif font-bold text-primary tracking-widest uppercase">Our Categories</h2>
                    <p className="text-secondary text-sm tracking-[0.3em] mt-1">Shop by Category</p>
                    <div className="h-0.5 w-16 bg-secondary mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { name: 'Necklaces', image: '/uploads/necklace.jpg', q: 'necklaces' },
                        { name: 'Jhumka', image: '/uploads/earrings.jpg', q: 'jhumka' },
                        { name: 'Bangles', image: '/uploads/bracelet.jpg', q: 'bangles' },
                        { name: 'Bridal Set', image: '/uploads/bridal-set.png', q: 'bridal' },
                        { name: 'Temple', image: '/uploads/gold-necklace.png', q: 'temple' },
                        { name: 'Maang Tikka', image: '/uploads/sapphire-set.png', q: 'maang tikka' },
                    ].map(cat => (
                        <Link
                            key={cat.name}
                            to={`/search/${cat.q}`}
                            className="group relative h-44 overflow-hidden rounded-xl shadow-md border-2 border-secondary/20 hover:border-secondary transition-all duration-300"
                        >
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-end pb-4">
                                <span className="text-white text-sm font-serif font-bold tracking-widest">{cat.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Festive Banner */}
            <section className="mb-16 relative overflow-hidden rounded-2xl">
                <div className="bg-gradient-to-r from-primary via-[#6b0000] to-primary py-10 px-8 text-center text-white relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M20 0L25 15H40L28 24L33 40L20 30L7 40L12 24L0 15H15Z'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
                    <p className="text-secondary text-sm tracking-[0.3em] uppercase mb-2 relative z-10">Festive Special Offer</p>
                    <h2 className="text-4xl font-serif font-bold text-white tracking-wide relative z-10" style={{ color: 'white' }}>Festive Season Sale — Up to 40% Off</h2>
                    <p className="text-gray-300 mt-3 mb-6 text-lg italic relative z-10">On all Bridal & Temple Collections</p>
                    <Link to="/shop" className="inline-block bg-secondary text-white font-bold px-10 py-3 uppercase tracking-widest hover:bg-gold-600 transition-all shadow-xl relative z-10">Shop Now</Link>
                </div>
            </section>

            {/* Bestsellers */}
            <section className="mb-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary tracking-wider">Our Bestsellers</h2>
                        <div className="h-0.5 w-20 bg-secondary mt-2"></div>
                    </div>
                    <Link to="/shop" className="text-secondary hover:text-gold-700 font-medium font-serif italic">View All →</Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {(products || []).filter(p => p.rating >= 4.7).slice(0, 4).map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Latest Arrivals */}
            <div className='flex justify-between items-end mb-8'>
                <div>
                    <h2 className='text-3xl font-serif font-bold text-primary tracking-wider'>Latest Arrivals</h2>
                    <div className="h-0.5 w-20 bg-secondary mt-2"></div>
                </div>
                <Link to="/shop" className="text-secondary hover:text-gold-700 font-medium font-serif italic">View All Collection →</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16'>
                {(products || []).slice(0, 8).map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>

            {/* Trust Features */}
            <section className="bg-white py-12 px-6 rounded-2xl shadow-sm border-2 border-secondary/10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {[
                        { icon: '🚚', title: 'Free Shipping', subtitle: 'Pan India on orders over ₹999' },
                        { icon: '🔒', title: 'Secure Payment', subtitle: 'UPI, COD, Net Banking accepted' },
                        { icon: '♻️', title: 'Easy Returns', subtitle: '7-day hassle-free return policy' },
                        { icon: '✨', title: 'Hallmarked Quality', subtitle: 'Premium grade artificial jewellery' },
                    ].map((f, i) => (
                        <div key={i} className="group">
                            <div className="text-4xl mb-3">{f.icon}</div>
                            <h4 className="font-bold text-base mb-1 text-primary">{f.title}</h4>
                            <p className="text-gray-500 text-sm">{f.subtitle}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-primary py-16 px-6 rounded-2xl text-center text-white mb-16 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32"></div>
                <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-2 relative z-10">🪔 SHRINGAR INNER CIRCLE</p>
                <h2 className="text-4xl font-serif font-bold mb-4 relative z-10" style={{ color: 'white' }}>Exclusive Offers for You</h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto relative z-10">Subscribe and get 10% off on your first order. Plus early access to festival collections & bridal lookbooks.</p>
                <form
                    onSubmit={(e) => { e.preventDefault(); toast.success('🎊 Swagat hai aapka! You are now in the Inner Circle.'); }}
                    className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto relative z-10"
                >
                    <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all"
                    />
                    <button type="submit" className="bg-secondary px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg text-white">Subscribe</button>
                </form>
            </section>

            {/* Testimonials */}
            <section className="mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif font-bold text-primary">Customer Reviews</h2>
                    <p className="text-gray-500 italic text-sm mt-1">What Our Customers Say</p>
                    <div className="h-0.5 w-16 bg-secondary mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Priya Sharma, Jaipur", quote: "Shringar ka Kundan haar bilkul asli jaisa lagta hai! Meri shaadi mein sab ne tarif ki. Quality bohot achhi hai.", rating: 5 },
                        { name: "Meena Gupta, Delhi", quote: "Jhumkas are so beautiful and lightweight! Wore them for Karva Chauth and received so many compliments. Will order again!", rating: 5 },
                        { name: "Rina Patel, Mumbai", quote: "The Meenakari bangles are absolutely stunning. Perfect for a function. Fast delivery and beautifully packaged too!", rating: 5 },
                    ].map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border-2 border-secondary/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-t-2xl"></div>
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
                            <span className="font-bold text-primary uppercase tracking-widest text-xs">— {t.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* WhatsApp Float */}
            <a
                href="https://wa.me/918209224452"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                title="Chat on WhatsApp"
            >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.945 1.745 5.513l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.298-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.793.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                </svg>
            </a>
        </div>
    );
};

export default HomeScreen;
