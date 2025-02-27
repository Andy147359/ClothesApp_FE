import ProductsTable from "./ProductsTable"

function AllProducts() {
    return (
        <div className="w-4/5 m-8">
            <h3 className="text-[22px] font-Poppins pb-2">Products Management</h3>
            <ProductsTable />
        </div>
    )
}

export default AllProducts
