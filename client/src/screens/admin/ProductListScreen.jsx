import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { PRODUCTS_URL } from '../../constants';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { userInfo } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(PRODUCTS_URL);
            setProducts(data.products);
            setLoading(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchProducts();
        }
    }, [userInfo]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${PRODUCTS_URL}/${id}`);
                toast.success('Product deleted');
                fetchProducts();
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                const { data } = await axios.post(PRODUCTS_URL, {});
                toast.success('Product created');
                navigate(`/admin/product/${data._id}/edit`);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="mt-8">
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-serif font-bold text-gray-900'>Products</h1>
                <button
                    onClick={createProductHandler}
                    className='bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700'
                >
                    <FaPlus className="mr-2" /> Create Product
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className='min-w-full leading-normal'>
                        <thead>
                            <tr>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>ID</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>NAME</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>PRICE</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>CATEGORY</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>BRAND</th>
                                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{product._id}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{product.name}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>₹{product.price}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{product.category}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{product.brand}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                                        <Link to={`/admin/product/${product._id}/edit`} className='text-blue-600 hover:text-blue-900 mr-4 inline-block'>
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className='text-red-600 hover:text-red-900 inline-block'
                                        >
                                            <FaTrash />
                                        </button>
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

export default ProductListScreen;
