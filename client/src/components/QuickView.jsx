import { useState, useContext } from 'react';
import { FaTimes, FaStar, FaShoppingCart } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import { toast } from 'react-toastify';

const QuickView = ({ product, isOpen, onClose }) => {
    const [qty, setQty] = useState(1);
    const { addToCart } = useContext(CartContext);

    if (!isOpen) return null;

    const addToCartHandler = () => {
        addToCart(product, qty);
        toast.success(`${product.name} added to cart!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-slide-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-500 hover:text-primary transition-all shadow-md"
                >
                    <FaTimes size={20} />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                    <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">{product.category}</span>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2 mb-4">{product.name}</h2>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-gold-500">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'} />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({product.numReviews} Reviews)</span>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        {product.discountPrice ? (
                            <>
                                <span className="text-3xl font-bold text-primary">₹{product.discountPrice}</span>
                                <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-bold text-gray-700">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="px-4 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                >-</button>
                                <span className="w-12 text-center font-bold">{qty}</span>
                                <button
                                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                    className="px-4 py-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                >+</button>
                            </div>
                        </div>

                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold uppercase tracking-widest transition-all shadow-lg ${product.countInStock === 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-gold-600'
                                }`}
                        >
                            <FaShoppingCart />
                            {product.countInStock === 0 ? 'Sold Out' : 'Add to Cart'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-gray-400 uppercase tracking-widest">
                        <span>• Free Luxury Packaging</span>
                        <span>• Certified Quality</span>
                        <span>• Secure Checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickView;
