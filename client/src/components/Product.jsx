import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import { useState, useContext } from 'react';
import QuickView from './QuickView';
import WishlistContext from '../context/WishlistContext';

const Product = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isWishlisted = isInWishlist(product._id);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    return (
        <div className='group relative'>
            {/* Image Container */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 relative rounded-xl border border-gray-50">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>

                {/* Quick View Button Overlay - Small and Centered */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <button
                        onClick={() => setIsQuickViewOpen(true)}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all font-bold text-sm uppercase tracking-widest shadow-2xl hover:bg-white hover:scale-105 pointer-events-auto"
                    >
                        <FaEye /> Quick View
                    </button>
                </div>

                {/* Wishlist Button Overlay */}
                <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-all z-20 ${isWishlisted ? 'bg-white text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100'
                        }`}
                >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {product.countInStock === 0 ? (
                        <div className="bg-gray-900/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 uppercase font-bold tracking-widest rounded shadow-sm">
                            Sold Out
                        </div>
                    ) : product.rating >= 4.7 ? (
                        <div className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 uppercase font-bold tracking-widest rounded shadow-sm">
                            Trending
                        </div>
                    ) : null}
                    {product.discountPrice > 0 && (
                        <div className="bg-gold-500 text-white text-[10px] px-2 py-1 uppercase font-bold tracking-widest rounded shadow-sm">
                            Sale
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 flex flex-col items-center text-center px-2">
                <Link to={`/product/${product._id}`} className="hover:text-gold-600 transition-colors">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                </Link>
                <p className="mt-1 text-[11px] text-gray-400 uppercase tracking-widest font-sans">{product.category}</p>
                <div className="mt-1 flex items-center justify-center scale-75">
                    <Rating value={product.rating} />
                </div>
                <div className="mt-1 flex items-center justify-center gap-2">
                    {product.discountPrice ? (
                        <>
                            <p className="text-base font-bold text-primary">₹{product.discountPrice}</p>
                            <p className="text-xs text-gray-400 line-through">₹{product.price}</p>
                        </>
                    ) : (
                        <p className="text-base font-bold text-primary">₹{product.price}</p>
                    )}
                </div>

                {/* Detailed View Link */}
                <Link
                    to={`/product/${product._id}`}
                    className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                >
                    Detailed View
                </Link>
            </div>
            <QuickView
                product={product}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </div>
    );
};

export default Product;
