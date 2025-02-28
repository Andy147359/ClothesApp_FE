import { useState } from "react";
import { productServices } from "../../../services/product.service";
import useProductStore from "../../../store/use-product-store";

const CreateProduct = () => {
    const { addProduct } = useProductStore();
    const [formData, setFormData] = useState({
        name: "",
        price: null,
        discountPrice: null,
        category: "",
        description: "",
        stock: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Generate image preview URL
        }
    };

    // Handle image remove
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation check: ensure all required fields are filled
        if (
            !formData.name ||
            !formData.price ||
            !formData.stock ||
            !imageFile
        ) {
            alert("Please fill out all required fields and upload an image.");
            return;
        }

        // Prepare form data
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price);
        productData.append("discountPrice", formData.discountPrice || 0);
        productData.append("category", formData.category || null);
        productData.append("description", formData.description || null);
        productData.append("stock", formData.stock);
        productData.append("imageFile", imageFile);

        try {
            const response = await productServices.createProduct(productData);
            if (response.status === 201) {
                setFormData({
                    name: "",
                    price: "",
                    discountPrice: "",
                    category: "",
                    description: "",
                    stock: "",
                });
                setImageFile(null);
                setImagePreview(null);
                addProduct(response.data);
                alert("Product created successfully!");
            } else {
                alert("Failed to create product.");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[100vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
            <form onSubmit={handleSubmit}>
                {/* Name */}
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

                {/* Price */}
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

                {/* Discount Price */}
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

                {/* Category */}
                <div>
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
                {/* Description */}
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

                {/* Stock */}
                <div>
                    <label className="pb-2">
                        Stock <span className="text-red-500">*</span>
                    </label>
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

                {/* Image File */}
                <div>
                    <label className="pb-2">
                        Upload Image <span className="text-red-500">*</span>
                    </label>
                    {!imagePreview && (
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-2 block w-full"
                            accept="image/*"
                        />
                    )}
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Product Preview"
                                className="w-[150px] h-[150px] object-cover rounded-[4px]"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
                </div>
                <br />

                <br />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
