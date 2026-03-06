import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(
        localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []
    );

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        const existItem = wishlistItems.find((x) => x._id === product._id);
        if (existItem) {
            toast.info('Item already in your wishlist');
            return;
        }
        setWishlistItems([...wishlistItems, product]);
        toast.success(`${product.name} added to wishlist!`);
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter((x) => x._id !== id));
        toast.success('Item removed from wishlist');
    };

    const isInWishlist = (id) => {
        return wishlistItems.find((x) => x._id === id);
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
