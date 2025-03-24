import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, discountPrice, imageUrl }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${id}`)} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col items-center">
            {/* Ảnh sản phẩm */}
            <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

            {/* Tên sản phẩm và giá */}
            <div className="w-full text-left p-4">
                {/* Tên sản phẩm */}
                <h2 className="text-lg font-semibold">{name}</h2>

                {/* Giá sản phâm */}
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
        </div>
    );
}

export default ProductCard;
