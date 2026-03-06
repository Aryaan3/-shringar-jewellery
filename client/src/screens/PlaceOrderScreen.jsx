import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ORDERS_URL } from '../constants';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const { cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, discountAmount, clearCartItems } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [paymentMethod, shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const { data } = await axios.post(
                ORDERS_URL,
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                }
            );

            clearCartItems();
            navigate(`/order/${data._id}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className='mt-8'>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='md:col-span-2 space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Shipping</h2>
                        <p className='text-gray-600'>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '}
                            {shippingAddress.postalCode},{' '} {shippingAddress.country}
                        </p>
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Payment Method</h2>
                        <p className='text-gray-600'>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className='divide-y divide-gray-100'>
                                {cartItems.map((item, index) => (
                                    <div key={index} className='py-4 flex items-center'>
                                        <div className='w-16 h-16 flex-shrink-0 overflow-hidden rounded border border-gray-200'>
                                            <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='ml-4 flex-1'>
                                            <Link to={`/product/${item._id}`} className='text-gray-900 font-medium hover:text-gold-600'>
                                                {item.name}
                                            </Link>
                                            <p className='text-gray-500 text-sm'>
                                                {item.qty} x ₹{item.discountPrice || item.price} = ₹{(item.qty * (item.discountPrice || item.price)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='md:col-span-1'>
                    <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
                        <h2 className='text-xl font-serif font-bold mb-6 text-gray-900'>Order Summary</h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Items</span>
                                <span className='font-medium text-gray-900'>₹{itemsPrice}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Shipping</span>
                                <span className='font-medium text-gray-900'>₹{shippingPrice}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Tax</span>
                                <span className='font-medium text-gray-900'>₹{taxPrice}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className='flex justify-between text-green-600 font-bold'>
                                    <span>Discount</span>
                                    <span>-${Number(discountAmount).toFixed(2)}</span>
                                </div>
                            )}
                            <div className='border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900'>
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                type='button'
                                className='w-full bg-gold-500 text-white font-bold py-3 rounded hover:bg-gold-600 transition duration-300 shadow-md'
                                disabled={cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
