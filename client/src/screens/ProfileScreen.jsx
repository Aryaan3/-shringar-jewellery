import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { ORDERS_URL } from '../constants';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`${ORDERS_URL}/myorders`);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders", error);
                setLoading(false);
            }
        };

        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            fetchOrders();
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('Profile update functionality coming soon!');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Profile Form */}
                <div className="lg:w-1/3">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b-2 border-primary pb-2 inline-block">User Profile</h2>

                    {message && (
                        <div className="bg-primary/10 text-primary p-4 mb-6 text-sm font-medium">
                            {message}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary transition-colors bg-gray-50 text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-200 focus:outline-none focus:border-primary transition-colors bg-gray-50 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition duration-300"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Orders Table */}
                <div className="lg:w-2/3">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-8 border-b-2 border-primary pb-2 inline-block">My Orders</h2>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="text-gray-500 animate-pulse font-serif italic text-xl">Loading your history...</div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-gray-50 p-12 text-center border border-dashed border-gray-300">
                            <p className="text-gray-500 font-serif italic mb-4">You haven't placed any orders yet.</p>
                            <Link to="/shop" className="text-primary font-bold uppercase tracking-widest text-xs hover:underline">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">ID</th>
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">DATE</th>
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">TOTAL</th>
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">PAID</th>
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">DELIVERED</th>
                                        <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2 text-sm text-gray-600 font-mono">{order._id.substring(0, 10)}...</td>
                                            <td className="py-4 px-2 text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                            <td className="py-4 px-2 text-sm font-bold text-gray-800">₹{order.totalPrice}</td>
                                            <td className="py-4 px-2 text-sm">
                                                {order.isPaid ? (
                                                    <span className="text-green-600 font-medium">{order.paidAt.substring(0, 10)}</span>
                                                ) : (
                                                    <span className="text-red-500">&#10005;</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-2 text-sm">
                                                {order.isDelivered ? (
                                                    <span className="text-green-600 font-medium">{order.deliveredAt.substring(0, 10)}</span>
                                                ) : (
                                                    <span className="text-red-500">&#10005;</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <Link
                                                    to={`/order/${order._id}`}
                                                    className="inline-block border border-primary text-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition duration-300"
                                                >
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
            </div>
        </div>
    );
};

export default ProfileScreen;
