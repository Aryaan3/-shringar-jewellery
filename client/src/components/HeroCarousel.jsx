import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroCarousel = () => {
    const slides = [
        {
            id: 1,
            image: '/uploads/bridal-set.png',
            tag: 'New Collection',
            title: 'Royal Bridal Shringar',
            subtitle: 'Handcrafted Kundan & Polki bridal sets — adorned for your most precious moments.',
            link: '/search/bridal',
            btnText: 'Shop Bridal Sets',
            gradient: 'from-primary/80 via-primary/50 to-transparent',
        },
        {
            id: 2,
            image: '/uploads/necklace.jpg',
            tag: 'Bestseller',
            title: 'Kundan Haar Collection',
            subtitle: 'Temple-inspired necklaces in 22K gold polish with vibrant Meenakari work.',
            link: '/search/necklaces',
            btnText: 'Explore Necklaces',
            gradient: 'from-black/70 via-black/40 to-transparent',
        },
        {
            id: 3,
            image: '/uploads/earrings.jpg',
            tag: 'Festival Special',
            title: 'Jhumka & Chandbali',
            subtitle: 'Traditional jhumkas and chandbali earrings to complete your ethnic look.',
            link: '/search/jhumka',
            btnText: 'Shop Earrings',
            gradient: 'from-[#4a0000]/80 via-[#4a0000]/40 to-transparent',
        },
        {
            id: 4,
            image: '/uploads/emerald-set.png',
            tag: 'Wedding Season',
            title: 'Meenakari Elegance',
            subtitle: 'Exquisite Rajasthani Meenakari jewellery — where colour meets craftsmanship.',
            link: '/search/meenakari',
            btnText: 'View Collection',
            gradient: 'from-[#014421]/80 via-[#014421]/40 to-transparent',
        },
    ];

    return (
        <div className="relative h-[520px] md:h-[680px] mb-16 overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5500, disableOnInteraction: false }}
                loop={true}
                speed={1200}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
                            {/* Decorative gold border bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent z-10"></div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
                                <div className="max-w-xl">
                                    <span className="inline-block text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                        {slide.tag}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-white tracking-wide drop-shadow-2xl leading-tight" style={{ color: 'white' }}>
                                        {slide.title}
                                    </h1>
                                    <div className="w-16 h-0.5 bg-secondary mb-5"></div>
                                    <p className="text-base md:text-lg mb-8 text-gray-100 font-light leading-relaxed max-w-md">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            to={slide.link}
                                            className="px-8 py-3.5 bg-secondary text-white font-bold tracking-widest hover:bg-gold-600 transition-all duration-300 uppercase text-sm shadow-xl"
                                        >
                                            {slide.btnText}
                                        </Link>
                                        <Link
                                            to="/shop"
                                            className="px-8 py-3.5 bg-transparent text-white border-2 border-white/70 font-bold tracking-widest hover:bg-white hover:text-primary transition-all duration-300 uppercase text-sm"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
