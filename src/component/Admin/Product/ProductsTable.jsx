import { Table } from 'antd';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from '../../Utils/Popup';
import { useEffect, useState } from 'react';
import { productServices } from '../../../services/product.service';
import useProductStore from '../../../store/use-product-store';

function ProductsTable() {
    const products = useProductStore((state) => state.products);
    console.log(products);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [product, setProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { updateProduct, removeProduct } = useProductStore();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discountPrice: "",
        category: "",
        description: "",
        stock: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice,
                category: product.category,
                description: product.description,
                stock: product.stock,
                imageUrl: product.imageUrl,
            });
        }
    }, [product]);

    const handleEditClick = (id) => {
        setIsPopupVisible(true);
        const selectedProduct = products.find((p) => p.id === id);
        setProduct(selectedProduct);
    };

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await productServices.deleteProduct(id);
            if (response.status === 200) {
                alert("Product deleted successfully!");
                removeProduct(id);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    console.log(formData.category);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = new FormData();
        console.log(formData);
        productData.append("name", formData.name);
        console.log("name", formData.name);
        console.log("name", productData);
        productData.append("price", formData.price);
        productData.append("discountPrice", formData.discountPrice || null);
        productData.append("category", formData.category || null); // Ensure category is included
        productData.append("description", formData.description || null);
        productData.append("stock", formData.stock);
        if (imageFile) {
            productData.append("imageFile", imageFile);
        } else if (formData.imageUrl) {
            productData.append("imageUrl", formData.imageUrl);
        }

        try {
            console.log(product.id);
            console.log(productData);
            const response = await productServices.updateProduct(product.id, productData);
            if (response?.status === 200) {
                alert("Product updated successfully!");
                setFormData({
                    name: "",
                    price: "",
                    discountPrice: "",
                    category: "",
                    description: "",
                    stock: "",
                    imageUrl: "",
                });
                setImageFile(null);
                updateProduct(response.data);
                setIsPopupVisible(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 400,
            render: (_, record) => (
                <div className="flex items-center">
                    <img
                        src={record.imageUrl}
                        alt="product"
                        className="h-12"
                    />
                    <span className="ml-2">{record.name}</span>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: ['price', 'discountPrice'],
            key: 'price',
            render: (_, record) => {
                const { price, discountPrice } = record;
                return discountPrice
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
                    : `${Number(price).toLocaleString()}đ`;
            },
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <FaRegEdit
                        onClick={() => handleEditClick(record.id)}
                        style={{ fontSize: '20px', color: '#1890ff', cursor: 'pointer' }}
                    />
                    <RiDeleteBin5Fill
                        onClick={() => handleDelete(record.id)}
                        style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={products}
                pagination={{ pageSize: 4 }}
                rowKey="id"
            />
            <Popup isOpen={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                <div className="">
                    <h5 className='text-center text-xl uppercase'>Edit Product</h5>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="pb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                                placeholder="Enter your product name..."
                            />
                        </div>
                        <br />

                        <div>
                            <label className="pb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                                placeholder="Enter your product price..."
                            />
                        </div>
                        <br />

                        <div>
                            <label className="pb-2">Discount Price</label>
                            <input
                                type="number"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                                placeholder="Enter your product discount price..."
                            />
                        </div>
                        <br />

                        <div className="">
                            <label className="pb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                            >
                                <option value="">Select a category</option>
                                <option value="T-shirt">T-shirt</option>
                                <option value="Pants">Pants</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Hats">Hats</option>
                            </select>
                        </div>
                        <br />
                        <div>
                            <label className="pb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[100px] border border-gray-300 rounded-[3px]"
                                placeholder="Enter your product description..."
                            ></textarea>
                        </div>
                        <br />
                        <div>
                            <label className="pb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                                placeholder="Enter your product stock..."
                            />
                        </div>
                        <br />
                        {/* Image Preview Section */}
                        <div>
                            <label className="pb-2">Current Image</label>
                            {formData.imageUrl ? (
                                <img
                                    src={formData.imageUrl}
                                    alt="Current product"
                                    className="mt-2 h-20 rounded-md"
                                />
                            ) : (
                                <p className="text-gray-500 mt-2">No image available</p>
                            )}
                        </div>
                        <br />
                        <div>
                            <label className="pb-2">Image</label>
                            <input
                                type="file"
                                name="imageFile"
                                onChange={handleImageChange}
                                className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px]"
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </Popup>
        </div>
    );
}

export default ProductsTable;