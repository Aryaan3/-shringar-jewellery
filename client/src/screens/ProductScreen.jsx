import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
import Product from '../components/Product';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { PRODUCTS_URL } from '../constants';
import WishlistContext from '../context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductScreen = () => {
    const { userInfo } = useContext(AuthContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const isWishlisted = isInWishlist(productId);

    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);

    const tabs = useMemo(() => [
        { id: 'description', label: 'Description' },
        { id: 'specs', label: 'Specifications' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'care', label: 'Care Advice' },
        { id: 'shipping', label: 'Shipping & Returns' }
    ], []);

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${PRODUCTS_URL}/${productId}/reviews`, {
                rating,
                comment,
            });
            toast.success('Review submitted successfully');
            setRating(0);
            setComment('');
            fetchProduct();
        } catch (err) {
            toast.error(err?.response?.data?.message || err.error);
        }
    };

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`${PRODUCTS_URL}/${productId}`);
            setProduct(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    useEffect(() => {
        const fetchRelated = async () => {
            if (product && product.category) {
                try {
                    const firstCategory = product.category.split(',')[0].trim();
                    const { data } = await axios.get(`${PRODUCTS_URL}?category=${firstCategory}`);
                    if (data && data.products) {
                        setRelatedProducts(data.products.filter(p => p._id !== productId).slice(0, 4));
                    }
                } catch (err) {
                    console.error("Error fetching related products", err);
                }
            }
        };

        let isMounted = true;
        if (!loading && product && product.category) {
            fetchRelated();
        }
        return () => { isMounted = false; };
    }, [product.category, productId, loading]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
    );

    return (
        <div className="pt-6">
            <Link className='inline-block mb-6 text-gray-500 hover:text-gold-600 font-medium' to='/'>
                &larr; Back to Shop
            </Link>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* Image */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-125 cursor-zoom-in'
                    />
                </div>

                {/* Details */}
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className='text-3xl font-serif font-bold text-gray-900'>{product.name}</h3>
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`p-3 rounded-full shadow-sm transition-all ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            {isWishlisted ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
                        </button>
                    </div>
                    <div className="flex items-center mb-4 space-x-4">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <span className="text-gray-400">|</span>
                        <span className="text-gold-600 font-medium">{product.category}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        {product.discountPrice ? (
                            <>
                                <p className="text-4xl font-bold text-gray-900">₹{product.discountPrice}</p>
                                <p className="text-xl text-gray-400 line-through decoration-red-500">₹{product.price}</p>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded uppercase">Save {Math.round((1 - product.discountPrice / product.price) * 100)}%</span>
                            </>
                        ) : (
                            <p className="text-4xl font-bold text-gray-900">₹{product.price}</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                        <div className='flex justify-between items-center mb-4 border-b border-gray-100 pb-2'>
                            <span className="text-gray-600 font-medium">Status:</span>
                            <span className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className='flex justify-between items-center mb-6'>
                                <span className="text-gray-600 font-medium font-serif italic text-sm">Select Quantity:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="block w-24 p-2 border border-gray-100 rounded-lg focus:outline-none bg-gray-50 font-bold"
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition duration-300 ${product.countInStock === 0
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-white border-2 border-primary text-primary hover:bg-gray-50 shadow-sm'
                                    }`}
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                {product.countInStock === 0 ? 'Sold Out' : 'Add to Cart'}
                            </button>

                            {product.countInStock > 0 && (
                                <button
                                    className="w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase bg-primary text-white hover:bg-gold-600 transition duration-300 shadow-md"
                                    onClick={() => {
                                        addToCart(product, qty);
                                        navigate('/login?redirect=/shipping');
                                    }}
                                >
                                    Buy It Now
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Features/Details */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Handcrafted with premium materials</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Free shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-700">
                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>30-day easy return policy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Tabs Section */}
            <div className="mt-16 border-t border-gray-100 pt-10">
                <div className="flex space-x-8 border-b border-gray-100 mb-8 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-lg font-serif transition-all duration-300 min-w-max ${activeTab === tab.id ? 'font-bold text-gray-900 border-b-2 border-gold-500' : 'font-medium text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in">
                    {activeTab === 'description' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-xl font-bold mb-4">Product Overview</h4>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Elevate your style with this stunning piece from our latest collection. Each detail is carefully crafted to ensure you look your best, whether it's for a special occasion or everyday elegance.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-xl">
                                <h4 className="text-xl font-bold mb-4 italic">Designer's Note</h4>
                                <p className="text-gray-600 italic">
                                    "This piece was inspired by the timeless beauty of royalty. We wanted to create something that feels substantial yet comfortable, using the finest artificial stones that rival the brilliance of natural diamonds."
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'specs' && (
                        <div className="max-w-2xl">
                            <h4 className="text-xl font-bold mb-6">Technical Details</h4>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="font-medium">Material</span>
                                    <span>High-grade Alloy, Zirconia</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="font-medium">Plating</span>
                                    <span>18K Gold Plated / Silver Rhodium</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="font-medium">Weight</span>
                                    <span>Approx. 45g</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="font-medium">Stone Type</span>
                                    <span>AAA Quality Cubic Zirconia</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="font-medium">Hypoallergenic</span>
                                    <span>Yes, Lead & Nickel Free</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'care' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-xl font-bold mb-4 font-serif italic text-primary">Preserving Your Treasure</h4>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Our jewelry is crafted with high-quality artificial stones and alloys. To keep it shining for years, please follow these care instructions:
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 font-bold">•</span>
                                        <span>Avoid contact with perfumes, lotions, and hairsprays.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 font-bold">•</span>
                                        <span>Remove before swimming, bathing, or exercising.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 font-bold">•</span>
                                        <span>Store in a cool, dry place, preferably in the provided luxury box.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 font-bold">•</span>
                                        <span>Gently wipe with a soft lint-free cloth after use.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gold-50/30 p-8 rounded-2xl border border-gold-100 italic text-gray-700">
                                "Jewelry is a piece of art that tells your story. Handle it with the same love it was created with."
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-xl font-bold mb-6">Customer Reviews</h4>
                                {product.reviews.length === 0 && <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>}
                                <ul className="space-y-6">
                                    {product.reviews.map((review) => (
                                        <li key={review._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <strong className="text-gray-900">{review.name}</strong>
                                                <Rating value={review.rating} />
                                            </div>
                                            <p className="text-xs text-gray-400 mb-2">{review.createdAt.substring(0, 10)}</p>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-fit">
                                <h4 className="text-xl font-bold mb-6 italic">Leave a Review</h4>
                                {userInfo ? (
                                    <form onSubmit={submitHandler} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Rating</label>
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 bg-white"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Comment</label>
                                            <textarea
                                                rows="3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 bg-white"
                                                placeholder="What did you think of the craftsmanship?"
                                            ></textarea>
                                        </div>
                                        <button className="w-full bg-primary text-white py-3 rounded-lg font-bold tracking-widest hover:bg-gold-600 transition-all uppercase shadow-md">Submit Review</button>
                                    </form>
                                ) : (
                                    <p className="text-gray-500">
                                        Please <Link to="/login" className="text-gold-600 font-bold underline">sign in</Link> to write a review.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">You May Also Treasure</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                        {relatedProducts.map(product => (
                            <div key={product._id} className="scale-95 hover:scale-100 transition-transform">
                                <Product key={product._id} product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
