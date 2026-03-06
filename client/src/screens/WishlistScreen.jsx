import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import WishlistContext from '../context/WishlistContext';

const WishlistScreen = () => {
    const { wishlistItems } = useContext(WishlistContext);

    return (
        <div className="py-8">
            <h1 className="text-3xl font-serif font-bold mb-8 text-gray-900 border-b border-gray-100 pb-4">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
                    <div className="text-gray-200 text-6xl mb-6">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <p className="text-xl text-gray-400 font-serif italic mb-8">Your treasure chest is empty.</p>
                    <Link
                        to='/shop'
                        className='bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-600 transition-all shadow-lg'
                    >
                        Explore Collections
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistScreen;
