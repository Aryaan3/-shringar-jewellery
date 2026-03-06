import React from 'react';

const AboutScreen = () => {
    return (
        <div className="py-16">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-2">Est. 2020 · Jaipur, India</p>
                    <h1 className="text-5xl font-serif font-bold text-primary mb-4 tracking-wide">Our Story</h1>
                    <p className="text-xl text-gray-500 italic">Our Story</p>
                    <div className="h-0.5 w-20 bg-secondary mx-auto mt-6"></div>
                </div>

                {/* Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20 text-left">
                    <div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 italic font-serif border-l-4 border-secondary pl-6">
                            "Shringar was born from a deep love for India's ancient jewellery traditions — and the belief that every woman deserves to feel like a queen, every single day."
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2020 in the heart of Jaipur — India's jewellery capital — Shringar set out to bring the artistry of traditional Indian jewellery to modern women at accessible prices. Our master craftsmen draw inspiration from centuries-old techniques of Kundan, Meenakari, Jadau, and Temple goldsmithing.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every piece tells a story — of the artisan who shaped it, the tradition it carries, and the woman who wears it with pride. We use only the finest alloys, real KDM gold polish, and hand-set stones to ensure each creation is indistinguishable from fine jewellery.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/20">
                        <img
                            src="/uploads/bridal-set.png"
                            alt="Indian Bridal Jewellery Craftsmanship"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { num: '50,000+', label: 'Happy Customers' },
                        { num: '200+', label: 'Unique Designs' },
                        { num: '5+', label: 'Years of Craft' },
                        { num: '15+', label: 'States Served' },
                    ].map((s, i) => (
                        <div key={i} className="text-center bg-white rounded-xl p-6 border-2 border-secondary/10 shadow-sm">
                            <div className="text-3xl font-serif font-bold text-primary">{s.num}</div>
                            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Craftsmanship */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: '🏺', title: 'Kundan Work', desc: 'Traditional Mughal-era technique using pure gold foil and uncut gemstones, handcrafted by Jaipur artisans.' },
                        { icon: '🎨', title: 'Meenakari Art', desc: 'Vibrant enamel colour work on gold-plated surfaces, a 500-year-old Rajasthani tradition.' },
                        { icon: '⛩️', title: 'Temple Jewellery', desc: 'Inspired by South Indian temple sculptures, featuring divine motifs in heavy gold-plated silver.' },
                    ].map((c, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl border-2 border-secondary/10 shadow-sm text-center hover:-translate-y-1 transition-transform">
                            <div className="text-4xl mb-4">{c.icon}</div>
                            <h3 className="text-lg font-serif font-bold text-primary mb-3">{c.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="bg-primary py-12 px-8 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
                    <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed" style={{ color: 'white' }}>
                        "Adorn yourself. Love yourself."
                    </p>
                    <p className="text-secondary mt-4 tracking-widest text-sm">Adorn yourself. Love yourself.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
