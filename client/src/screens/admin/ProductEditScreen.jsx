import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS_URL } from '../../constants';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [occasion, setOccasion] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${PRODUCTS_URL}/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setColor(data.color || '');
                setOccasion(data.occasion || '');
                setDiscountPrice(data.discountPrice || 0);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            }
        };

        fetchProduct();
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${PRODUCTS_URL}/${productId}`, {
                name, price, image, brand, category, countInStock, description, color, occasion, discountPrice
            });
            toast.success('Product updated');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className='max-w-2xl mx-auto mt-8'>
            <Link to='/admin/productlist' className='text-gray-600 hover:text-gray-900 mb-4 inline-block'>
                &larr; Go Back
            </Link>

            <h1 className='text-3xl font-serif font-bold mb-6'>Edit Product</h1>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                        {/* Image upload handler could be added here */}
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                        <input
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <input
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock count"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wider text-xs">Color</label>
                            <input
                                type="text"
                                placeholder="e.g. Gold, Silver, Rose Gold"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wider text-xs">Occasion</label>
                            <select
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none bg-gray-50"
                            >
                                <option value="">Select Occasion</option>
                                <option value="Daily Wear">Daily Wear</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Party">Party</option>
                                <option value="Office Wear">Office Wear</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wider text-xs">Discount Price (₹)</label>
                        <input
                            type="number"
                            placeholder="Set a sale price (leave 0 if no discount)"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none bg-gold-50/30"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Current Price: ₹{price} | If Discount Price is &gt; 0, the site will show a "SALE" badge.</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded focus:border-gold-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold-500 text-white font-bold py-3 rounded hover:bg-gold-600 transition shadow-md"
                    >
                        Update Result
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductEditScreen;
