import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaLongArrowAltLeft } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const CartScreen = () => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, totalPrice, itemsPrice, taxPrice, shippingPrice, discountAmount, applyCoupon } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);
    const [couponInput, setCouponInput] = useState('');

    const checkoutHandler = () => {
        if (!userInfo) {
            navigate('/login?redirect=/shipping');
        } else {
            navigate('/shipping');
        }
    };

    return (
        <div>
            <h1 className='text-3xl font-serif font-bold mb-8 text-gray-900'>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100">
                    <p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
                    <Link to='/shop' className='inline-flex items-center text-gold-600 hover:text-gold-700 font-bold'>
                        <FaLongArrowAltLeft className="mr-2" /> Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Items List */}
                    <div className='md:col-span-2 space-y-4'>
                        {cartItems.map((item) => (
                            <div key={item._id} className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center'>
                                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                </div>
                                <div className="ml-4 flex-1">
                                    <Link to={`/product/${item._id}`} className='text-lg font-bold text-gray-800 hover:text-gold-600'>
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <p className="font-bold text-gray-900">₹{item.discountPrice || item.price}</p>
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="p-1 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type='button'
                                        onClick={() => removeFromCart(item._id)}
                                        className='text-red-500 hover:text-red-700 transition'
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className='md:col-span-1'>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <h2 className="text-xl font-serif font-bold mb-4 text-gray-900">Order Summary</h2>
                            <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span>₹{itemsPrice}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600 font-bold">
                                        <span>Discount</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between font-bold text-lg text-gray-900 mt-4 mb-6">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Have a Coupon?</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Try SAVE10"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="flex-1 p-2 border border-gray-100 rounded bg-gray-50 text-xs focus:outline-none focus:border-gold-500"
                                    />
                                    <button
                                        onClick={() => applyCoupon(couponInput)}
                                        className="px-4 py-2 bg-gray-100 text-gray-900 text-xs font-bold rounded hover:bg-gold-500 hover:text-white transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                <p className="text-[9px] text-gray-400 mt-2 italic font-sans">Available: SAVE10, FREE50</p>
                            </div>

                            <button
                                type='button'
                                className='w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-gold-600 transition shadow-lg uppercase tracking-widest'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                {userInfo ? 'Proceed To Checkout' : 'Login to Checkout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
