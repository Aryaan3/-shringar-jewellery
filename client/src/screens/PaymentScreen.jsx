import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const { shippingAddress, savePaymentMethod } = useContext(CartContext);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-3xl font-serif font-bold mb-6 text-center">Payment Method</h1>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-4">Select Method</label>

                        <div className="space-y-4">
                            <div className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-gold-500 bg-gold-50/30' : 'border-gray-100 hover:bg-gray-50'}`} onClick={() => setPaymentMethod('PayPal')}>
                                <input
                                    type="radio"
                                    id="PayPal"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-gold-600 focus:ring-gold-500"
                                />
                                <label htmlFor="PayPal" className="ml-3 text-sm font-bold text-gray-700 flex flex-col cursor-pointer">
                                    <span>PayPal or Credit Card</span>
                                    <span className="text-[10px] font-normal text-gray-400">Secure international payment</span>
                                </label>
                            </div>

                            <div className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-gold-500 bg-gold-50/30' : 'border-gray-100 hover:bg-gray-50'}`} onClick={() => setPaymentMethod('UPI')}>
                                <input
                                    type="radio"
                                    id="UPI"
                                    name="paymentMethod"
                                    value="UPI"
                                    checked={paymentMethod === 'UPI'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-gold-600 focus:ring-gold-500"
                                />
                                <label htmlFor="UPI" className="ml-3 text-sm font-bold text-gray-700 flex flex-col cursor-pointer">
                                    <span>UPI Payments</span>
                                    <span className="text-[10px] font-normal text-gray-400">GPay, PhonePe, Paytm, BHIM</span>
                                </label>
                            </div>

                            <div className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-gold-500 bg-gold-50/30' : 'border-gray-100 hover:bg-gray-50'}`} onClick={() => setPaymentMethod('COD')}>
                                <input
                                    type="radio"
                                    id="COD"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-4 h-4 text-gold-600 focus:ring-gold-500"
                                />
                                <label htmlFor="COD" className="ml-3 text-sm font-bold text-gray-700 flex flex-col cursor-pointer">
                                    <span>Cash on Delivery</span>
                                    <span className="text-[10px] font-normal text-gray-400">Pay when your jewels arrive</span>
                                </label>
                            </div>
                        </div>
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

export default PaymentScreen;
