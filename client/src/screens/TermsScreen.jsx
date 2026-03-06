import React from 'react';

const TermsScreen = () => {
    return (
        <div className="py-16">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="text-secondary text-xs tracking-[0.4em] uppercase mb-2">Our Policies</p>
                    <h1 className="text-5xl font-serif font-bold text-primary mb-4 tracking-wide">Shipping & Returns</h1>
                    <div className="h-0.5 w-20 bg-secondary mx-auto mt-4"></div>
                </div>

                <div className="space-y-10 text-gray-700 leading-relaxed">
                    <section className="bg-white p-8 rounded-2xl border-2 border-secondary/10 shadow-sm">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">🚚 Shipping Information</h2>
                        <p className="mb-4">We ship across India via trusted courier partners. Orders are dispatched within 2–3 business days.</p>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> <span><strong>Free Shipping:</strong> On all orders above ₹999 (Pan India)</span></li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> <span><strong>Standard Delivery:</strong> ₹49 flat rate · 5–7 business days</span></li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> <span><strong>Express Delivery:</strong> ₹149 flat rate · 2–3 business days</span></li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> <span><strong>COD Available:</strong> Cash on Delivery on all orders</span></li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border-2 border-secondary/10 shadow-sm">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">↩️ Returns & Exchanges</h2>
                        <p className="mb-4">Your satisfaction is our priority. We offer a 7-day return policy on all unused items.</p>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Items must be returned in original packaging with tags intact.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Full refund to original payment method or store credit.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Bridal & custom orders are non-returnable.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Contact us on WhatsApp (+91 8209224452) to initiate a return.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border-2 border-secondary/10 shadow-sm">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-4">✨ Jewellery Care Instructions</h2>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Keep away from water, sweat, perfume, and chemicals to maintain gold polish.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Store in the provided jewellery pouch / box to prevent tarnishing.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Wipe gently with a soft dry cloth after each use.</li>
                            <li className="flex items-start gap-3"><span className="text-secondary font-bold">✦</span> Remove before bathing, swimming, or doing household chores.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsScreen;
