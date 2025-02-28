import SimpleSlider from '../component/Layout/SimpleSlider';
import Intro from '../component/Layout/Intro';
import Tag from '../component/Layout/Tag';
import ProductList from "../component/product/ProductList";
import Header from '../component/Layout/Header';
import Footer from '../component/Layout/Footer';
import useProductStore from '../store/use-product-store';
import { useEffect } from 'react';
import { useState } from 'react';



function HomePage() {
    const optionsNewArrival = ['', 'T-shirt', 'Pants', 'Shoes', 'Hats'];
    const { fetchProducts } = useProductStore();
    const products = useProductStore((state) => state.products);
    const [category, setCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (category === '') {
            setFilteredProducts(products);
            return;
        }
        setFilteredProducts(products.filter((product) => product.category === category));
    }, [category, products]);

    return (
        <>
            <Header />
            <Tag tag='Products List' options={optionsNewArrival} setCategory={setCategory} />
            {products && (<ProductList products={filteredProducts} />)}
            <Footer />
        </>
    )
}

export default HomePage
