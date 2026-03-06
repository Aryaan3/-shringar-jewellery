import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaPhone, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import WishlistContext from '../context/WishlistContext';

const Navbar = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useContext(WishlistContext);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const wishlistCount = wishlistItems.length;

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const logoutHandler = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="font-sans">
            {/* Top Bar */}
            <div className="bg-primary text-white py-2 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className='hidden sm:inline font-medium tracking-wide'>🚚 Free Shipping Pan India on Orders Over ₹999</span>
                        <span className="flex items-center gap-1"><FaPhone className="mr-1" /> +91 8209224452</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-secondary transition-colors"><FaInstagram /></a>
                        <a href="#" className="hover:text-secondary transition-colors"><FaFacebookF /></a>
                        <a href="#" className="hover:text-secondary transition-colors"><FaWhatsapp /></a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white py-4 border-b-2 border-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 text-center">
                        <h1 className="text-4xl font-serif font-bold text-primary tracking-[0.2em] uppercase">Shringar</h1>
                        <p className="text-xs text-secondary tracking-[0.3em] font-medium">The World of Indian Jewellery</p>
                    </Link>

                    {/* Search Bar */}
                    <div className="w-full md:w-1/2 max-w-lg relative group/search">
                        <form onSubmit={submitHandler} className="relative">
                            <input
                                type="text"
                                name="q"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search Kundan, Jhumka, Bangles, Maang Tikka..."
                                className="w-full py-2.5 pl-4 pr-10 border-2 border-secondary/30 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-amber-50/30"
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-2.5 mr-3 text-gray-400 hover:text-primary">
                                <FaSearch />
                            </button>
                        </form>
                        {keyword && (
                            <div className="absolute top-full left-0 w-full bg-white border border-secondary/20 shadow-2xl rounded-xl mt-2 hidden group-focus-within/search:block z-50 overflow-hidden">
                                <div className="p-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-50">Suggestions</div>
                                {['Kundan Set', 'Jhumka', 'Bangles', 'Maang Tikka', 'Bridal Set', 'Anklets'].filter(s => s.toLowerCase().includes(keyword.toLowerCase())).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => { setKeyword(s); navigate(`/search/${s.toLowerCase()}`); }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50 flex items-center gap-2"
                                    >
                                        <FaSearch className="text-gray-300 text-xs" />
                                        <span>{s}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-6 text-gray-700">
                        {userInfo ? (
                            <div className="relative group">
                                <button className="flex items-center hover:text-primary gap-1">
                                    <FaUser className="text-xl" />
                                    <span className="text-sm font-medium">{userInfo.name.split(' ')[0]}</span>
                                </button>
                                <div className="absolute right-0 w-52 bg-white border border-secondary/20 shadow-2xl rounded-lg hidden group-hover:block z-50 overflow-hidden">
                                    <div className="bg-primary/5 px-4 py-3 border-b border-secondary/10">
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest">{userInfo.name}</p>
                                    </div>
                                    <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary">My Profile & Orders</Link>
                                    <Link to="/wishlist" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary">My Wishlist</Link>
                                    {userInfo.isAdmin && (
                                        <>
                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-secondary font-bold">Admin</p>
                                            </div>
                                            <Link to="/admin/productlist" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary">Manage Products</Link>
                                            <Link to="/admin/orderlist" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-primary">Manage Orders</Link>
                                        </>
                                    )}
                                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center hover:text-primary gap-1">
                                <FaUser className="text-xl" />
                                <span className="ml-1 text-sm font-medium hidden lg:inline">Sign In</span>
                            </Link>
                        )}

                        <Link to="/wishlist" className="flex items-center hover:text-primary relative group">
                            <FaHeart className="text-xl" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Wishlist</span>
                        </Link>

                        <Link to="/cart" className="flex items-center hover:text-primary relative group">
                            <FaShoppingCart className="text-xl" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-white border-b-2 border-secondary/20 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex justify-center space-x-6 py-3 overflow-x-auto">
                        <Link to="/" className="text-sm font-bold text-primary hover:text-gold-600 tracking-widest whitespace-nowrap transition-colors uppercase">
                            Home
                        </Link>
                        {[
                            { label: 'NECKLACES', q: 'necklaces' },
                            { label: 'JHUMKA', q: 'jhumka' },
                            { label: 'BANGLES', q: 'bangles' },
                            { label: 'MAANG TIKKA', q: 'maang tikka' },
                            { label: 'BRIDAL SETS', q: 'bridal' },
                            { label: 'TEMPLE', q: 'temple' },
                        ].map((item) => (
                            <Link
                                key={item.q}
                                to={`/search/${item.q}`}
                                className="text-sm font-bold text-gray-800 hover:text-primary tracking-widest whitespace-nowrap transition-colors uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link to="/shop" className="text-sm font-bold text-secondary hover:text-gold-600 tracking-widest whitespace-nowrap transition-colors uppercase">All Collections</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
