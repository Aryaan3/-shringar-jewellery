import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { ORDERS_URL } from '../../constants';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const OrderListScreen = () => {
    const { userInfo } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(ORDERS_URL);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        if (userInfo && userInfo.isAdmin) {
            fetchOrders();
        }
    }, [userInfo]);

    return (
        <div className="mt-8">
            <h1 className='text-3xl font-serif font-bold mb-6 text-gray-900'>Orders</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className='min-w-full leading-normal'>
                        <thead>
                            <tr>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>ID</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>USER</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>DATE</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>TOTAL</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>PAID</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>DELIVERED</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order._id}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order.user && order.user.name}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{order.createdAt.substring(0, 10)}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>₹{order.totalPrice}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        <Link to={`/order/${order._id}`} className='text-gold-600 hover:text-gold-900 font-medium'>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;
