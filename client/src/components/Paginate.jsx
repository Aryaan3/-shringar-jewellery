import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <div className='flex justify-center my-8'>
                <nav className='flex gap-2' aria-label='Pagination'>
                    {[...Array(pages).keys()].map((x) => (
                        <Link
                            key={x + 1}
                            to={
                                !isAdmin
                                    ? keyword
                                        ? `/search/${keyword}/page/${x + 1}`
                                        : `/shop/page/${x + 1}`
                                    : `/admin/productlist/${x + 1}`
                            }
                            className={`px-4 py-2 text-sm font-bold border rounded-lg transition-colors ${x + 1 === page
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {x + 1}
                        </Link>
                    ))}
                </nav>
            </div>
        )
    );
};

export default Paginate;
