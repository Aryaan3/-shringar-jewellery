import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const { shippingAddress, saveShippingAddress } = useContext(CartContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/payment');
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <CheckoutSteps step1 step2 />
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">Shipping Details</h1>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold-500 text-white font-bold py-3 rounded hover:bg-gold-600 transition duration-300"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;
