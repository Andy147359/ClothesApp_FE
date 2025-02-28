import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/use-product-store";
import ProductList from "./ProductList";
import { Footer } from "antd/es/layout/layout";
import { productServices } from "../../services/product.service";
import useCartStore from "../../store/use-cart-store";
import { cartServices } from "../../services/cart.service";
import { use } from "react";
import useAuthStore from "../../store/use-auth-store";

function ProductDetails() {
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    const cart = useCartStore((state) => state.cart);
    const { id } = useParams();
    const { products, fetchProducts } = useProductStore();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Check if the product exists in the store
        const foundProduct = products.find((p) => p.id === id);

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            // If not in the store, fetch it from the API
            productServices.getProducts().then((response) => {
                const productFromApi = response?.data.find((p) => p.id === id);
                if (productFromApi) setProduct(productFromApi);
            }).catch((error) => console.error("Error fetching product by ID:", error));
        }
    }, [id, products, fetchProducts]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        cartServices.addToCartServer(user.userId, product.id, quantity);
        alert('Add to cart successfully!');
        setQuantity(1);
    };
    console.log(cart);

    return (
        <div className="w-full bg-slate-300">
            {/* Main Product Detail Section */}
            <div className="w-[1200px] mx-auto bg-white flex px-2">
                <img
                    className="w-[500px] h-[500px] object-cover  p-5"
                    src={product.imageUrl || "https://via.placeholder.com/500"}
                    alt={product.name}
                />
                <div className="w-1/2">
                    <div className="px-10 py-12">
                        <h1 className="uppercase text-2xl font-bold">{product.name}</h1>
                        <p className="pb-2">Available: {product.stock}</p>
                        <p className="border-b pb-3 text-xl font-medium text-red-500">
                            {product.discountPrice ? `${product.discountPrice.toLocaleString()}đ` : `${product.price.toLocaleString()}đ`}
                        </p>
                        <p className="py-2">Description: {product.description}</p>
                        <div className="py-2">
                            {product.colors?.map((color, index) => (
                                <a key={index} className="rounded-lg py-2 px-4 border mr-2 text-center">
                                    {color}
                                </a>
                            ))}
                        </div>

                        <div className="py-2">
                            {product.sizes?.map((size, index) => (
                                <a key={index} className="py-2 px-4 mr-2 border rounded-lg">
                                    {size}
                                </a>
                            ))}
                        </div>

                        <p className="pt-6">Count</p>
                        <div className="flex items-center py-2">
                            <p onClick={() => { if (quantity > 1) setQuantity(quantity - 1); }} className="text-xl border px-4 py-2 cursor-pointer">−</p>
                            <a className="px-4 py-2 border rounded-lg mx-4">{quantity}</a>
                            <p onClick={() => { setQuantity(quantity + 1) }} className="text-xl border px-4 py-2 cursor-pointer">+</p>
                        </div>
                        <div className="flex">
                            <button onClick={handleAddToCart} className="px-4 py-2 w-full font-medium bg-slate-300 text-black rounded-lg">
                                Add to cart
                            </button>
                            {/* <button className="px-4 py-2 w-full font-medium bg-red-500 text-black rounded-lg ml-4">
                                Buy now
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Products Section */}
            <div className="w-[1200px] mx-auto bg-white px-2">
                <h2 className="pt-8 pb-2 font-medium text-xl">#Other Products</h2>
                <ProductList products={products} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
