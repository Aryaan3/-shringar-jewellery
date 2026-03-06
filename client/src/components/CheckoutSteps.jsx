import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className='flex justify-center mb-8'>
            <ol className='flex items-center w-full max-w-2xl text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm sm:text-base'>
                <li className={`flex md:w-full items-center ${step1 ? 'text-gold-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step1 ? <Link to='/login'>Sign In</Link> : <span className="cursor-not-allowed">Sign In</span>}
                    </span>
                </li>
                <li className={`flex md:w-full items-center ${step2 ? 'text-gold-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step2 ? <Link to='/shipping'>Shipping</Link> : <span className="cursor-not-allowed">Shipping</span>}
                    </span>
                </li>
                <li className={`flex md:w-full items-center ${step3 ? 'text-gold-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {step3 ? <Link to='/payment'>Payment</Link> : <span className="cursor-not-allowed">Payment</span>}
                    </span>
                </li>
                <li className={`flex items-center ${step4 ? 'text-gold-600' : ''}`}>
                    {step4 ? <Link to='/placeorder'>Place Order</Link> : <span className="cursor-not-allowed">Place Order</span>}
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;
