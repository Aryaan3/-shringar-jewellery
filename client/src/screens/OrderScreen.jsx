import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ORDERS_URL, PAYPAL_URL } from '../constants'; // PAYPAL_URL for future expansion
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { userInfo } = useContext(AuthContext);

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            // Should be handled by PrivateRoute but double check
            return;
        }

        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`${ORDERS_URL}/${orderId}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, userInfo]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="mt-8">
            <h1 className='text-3xl font-serif font-bold mb-6 text-gray-900'>Order {order._id}</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='md:col-span-2 space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Shipping</h2>
                        <p className='text-gray-600 mb-2'>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p className='text-gray-600 mb-2'>
                            <strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-gold-600 hover:underline">{order.user.email}</a>
                        </p>
                        <p className='text-gray-600 mb-4'>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-700 p-3 rounded">Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 p-3 rounded">Not Delivered</div>
                        )}
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Payment Method</h2>
                        <p className='text-gray-600 mb-4'>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-700 p-3 rounded">Paid on {order.paidAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-700 p-3 rounded">Not Paid</div>
                        )}
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                        <h2 className='text-2xl font-serif font-bold mb-4 text-gray-900'>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <p>Order is empty</p>
                        ) : (
                            <div className='divide-y divide-gray-100'>
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className='py-4 flex items-center'>
                                        <div className='w-16 h-16 flex-shrink-0 overflow-hidden rounded border border-gray-200'>
                                            <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                        </div>
                                        <div className='ml-4 flex-1'>
                                            <Link to={`/product/${item.product}`} className='text-gray-900 font-medium hover:text-gold-600'>
                                                {item.name}
                                            </Link>
                                            <p className='text-gray-500 text-sm'>
                                                {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
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
                                <span className='font-medium text-gray-900'>₹{order.itemsPrice}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Shipping</span>
                                <span className='font-medium text-gray-900'>₹{order.shippingPrice}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Tax</span>
                                <span className='font-medium text-gray-900'>₹{order.taxPrice}</span>
                            </div>
                            <div className='border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900'>
                                <span>Total</span>
                                <span>₹{order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
