import { FaStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
    return (
        <div className='flex items-center mb-2'>
            {[1, 2, 3, 4, 5].map((index) => (
                <FaStar
                    key={index}
                    className={
                        value >= index
                            ? 'text-yellow-500' // filled star
                            : value >= index - 0.5
                                ? 'text-yellow-300' // half star (simplified for this icon set to just use lighter yellow or implementing half star logic with other icons, sticking to full for simplicity or Logic)
                                : 'text-gray-300' // empty star
                    }
                />
            ))}
            <span className='ml-2 text-sm text-gray-500'>{text && text}</span>
        </div>
    );
};

export default Rating;
