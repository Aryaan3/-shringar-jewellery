import { createContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    );

    const [shippingAddress, setShippingAddress] = useState(
        localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {}
    );

    const [paymentMethod, setPaymentMethod] = useState(
        localStorage.getItem('paymentMethod')
            ? JSON.parse(localStorage.getItem('paymentMethod'))
            : 'PayPal'
    );

    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const applyCoupon = (code) => {
        if (code.toUpperCase() === 'SAVE10') {
            const discount = Number(itemsPrice) * 0.1;
            setDiscountAmount(discount);
            setCouponCode(code.toUpperCase());
            toast.success('Coupon Applied: 10% Discount!');
        } else if (code.toUpperCase() === 'FREE50') {
            setDiscountAmount(50);
            setCouponCode(code.toUpperCase());
            toast.success('Coupon Applied: $50 Flat Discount!');
        } else {
            setDiscountAmount(0);
            setCouponCode('');
            toast.error('Invalid Coupon Code');
        }
    };

    const addToCart = (product, qty) => {
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === existItem._id ? { ...existItem, qty: Number(qty) } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: Number(qty) }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    const saveShippingAddress = (address) => {
        setShippingAddress(address);
        localStorage.setItem('shippingAddress', JSON.stringify(address));
    }

    const savePaymentMethod = (method) => {
        setPaymentMethod(method);
        localStorage.setItem('paymentMethod', JSON.stringify(method));
    }

    const clearCartItems = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    }

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const prices = useMemo(() => {
        const items = addDecimals(
            cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.qty, 0)
        );
        const shipping = addDecimals(Number(items) > 100 ? 0 : 10);
        const tax = addDecimals(Number((0.15 * (Number(items) - discountAmount)).toFixed(2)));
        const total = (
            Number(items) +
            Number(shipping) +
            Number(tax) -
            Number(discountAmount)
        ).toFixed(2);

        return { itemsPrice: items, shippingPrice: shipping, taxPrice: tax, totalPrice: total };
    }, [cartItems, discountAmount]);

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = prices;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        discountAmount,
        couponCode,
        applyCoupon,
        totalPrice
    }), [
        cartItems, shippingAddress, paymentMethod, itemsPrice,
        shippingPrice, taxPrice, discountAmount, couponCode, totalPrice
    ]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
