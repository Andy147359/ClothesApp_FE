import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, discountPrice, imageUrl }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${id}`)} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col items-center">
            <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
            <div className="w-full text-left p-4">
                <h2 className="text-lg font-semibold">{name}</h2>
                {discountPrice
                    ? (
                        <>
                            <del className="text-red-600 mr-1">
                                {Number(price).toLocaleString()}đ
                            </del>
                            <span>
                                {Number(discountPrice).toLocaleString()}đ
                            </span>
                        </>
                    )
                    : `${Number(price).toLocaleString()}đ`
                }
            </div>
            {/* <button className='py-2  w-full bg-gray-400 text-black font-bold text-center mt-auto rounded'>Buy now</button> */}
        </div>
    );
}

export default ProductCard;
