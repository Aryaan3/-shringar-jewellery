import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { PRODUCTS_URL } from '../constants';
import { FaSearch } from 'react-icons/fa';

const ShopScreen = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword, pageNumber } = useParams();
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [occasion, setOccasion] = useState('');
    const [sort, setSort] = useState('newest');
    const [priceRange, setPriceRange] = useState(5000);
    const [rating, setRating] = useState(0);

    const categories = ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Sets'];
    const colors = ['Gold', 'Silver', 'Rose Gold', 'White', 'Blue', 'Green', 'Red'];
    const occasions = ['Party', 'Wedding', 'Daily Wear'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = PRODUCTS_URL;
                const params = new URLSearchParams();

                if (urlKeyword) {
                    params.append('keyword', urlKeyword);
                }
                if (category) params.append('category', category);
                if (color) params.append('color', color);
                if (occasion) params.append('occasion', occasion);
                if (sort) params.append('sort', sort);
                params.append('price', priceRange.toString());
                params.append('rating', rating.toString());
                params.append('pageNumber', pageNumber || '1');

                const { data } = await axios.get(`${url}?${params.toString()}`);
                setProducts(data.products || data || []);
                setPages(data.pages || 1);
                setPage(data.page || 1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [urlKeyword, category, color, occasion, sort, priceRange, rating, pageNumber]);

    const [showFilters, setShowFilters] = useState(false);

    const resetFilters = () => {
        setCategory('');
        setColor('');
        setOccasion('');
        setSort('newest');
        setPriceRange(5000);
        setRating(0);
        navigate('/shop');
    };

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden w-full py-3 bg-primary text-white font-bold rounded-lg mb-4 flex items-center justify-center gap-2"
                >
                    <FaSearch /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar */}
                <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-white p-6 border border-gray-100 shadow-sm sticky top-24 rounded-xl">
                        <h2 className="text-xl font-bold mb-6 border-b pb-2 text-primary uppercase tracking-widest text-sm">Filters</h2>

                        {/* Categories */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-700 text-xs uppercase tracking-wider">Categories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => { setCategory(''); navigate('/shop'); }}
                                    className={`block text-sm ${category === '' && !urlKeyword ? 'text-gold-600 font-bold' : 'text-gray-600 hover:text-gold-500'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`block text-sm ${category === cat ? 'text-gold-600 font-bold' : 'text-gray-600 hover:text-gold-500'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-700 text-xs uppercase tracking-wider">Colors</h3>
                            <div className="flex flex-wrap gap-2">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(color === c ? '' : c)}
                                        className={`px-3 py-1 text-[10px] border rounded-full transition-all uppercase tracking-tighter ${color === c ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-gold-500'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Occasion */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-700 text-xs uppercase tracking-wider">Occasion</h3>
                            <div className="space-y-1">
                                {occasions.map(occ => (
                                    <label key={occ} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={occasion === occ}
                                            onChange={() => setOccasion(occasion === occ ? '' : occ)}
                                            className="rounded border-gray-300 text-gold-600 focus:ring-gold-500 transition-all"
                                        />
                                        <span className="group-hover:text-gold-600 transition-colors uppercase text-[10px] tracking-widest">{occ}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3 text-gray-700 text-xs uppercase tracking-wider">Max Price: ${priceRange}</h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="100"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>$0</span>
                                <span>$5000</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-10">
                            <h3 className="font-semibold mb-4 text-gray-700 text-xs uppercase tracking-wider">Rating</h3>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRating(r)}
                                        className={`flex items-center w-full p-2 rounded-lg transition-all ${rating === r ? 'bg-gold-50 border border-gold-200 shadow-sm' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="flex text-gold-500 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-3 h-3 ${i < r ? 'fill-current' : 'text-gray-200'}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold ${rating === r ? 'text-gold-700' : 'text-gray-400'}`}>& Up</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="w-full py-2 text-xs font-bold tracking-widest uppercase border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg"
                        >
                            Reset Filters
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div>
                            <h1 className='text-2xl font-serif font-bold text-gray-900'>
                                {category || urlKeyword || 'All Collections'}
                            </h1>
                            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{(products || []).length} Items Found</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold font-sans">Sort By:</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="text-xs border-none bg-gray-50 rounded-lg p-2 font-bold focus:outline-none focus:ring-1 focus:ring-gold-500"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {(products || []).length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 mb-4 font-serif italic text-lg">{loading ? 'Loading our collection...' : 'No treasures found matching your search.'}</p>
                                <button
                                    onClick={resetFilters}
                                    className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-600 transition-all shadow-md"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            (products || []).map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        )}
                    </div>

                    <div className="mt-12">
                        <Paginate pages={pages} page={page} keyword={urlKeyword ? urlKeyword : ''} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopScreen;
