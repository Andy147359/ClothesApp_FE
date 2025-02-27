import ProductCard from './ProductCard';

const ProductList = ({ products }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {products.map(product => (
                <ProductCard
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    );
}

export default ProductList;
