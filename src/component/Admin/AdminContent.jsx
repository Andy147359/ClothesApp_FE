import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Row, Col, Statistic } from "antd";
import { MdBorderClear } from "react-icons/md";
import useProductStore from "../../store/use-product-store";

function AdminContent() {
    const { products } = useProductStore((state) => state);
    return (
        <div className="w-4/5 m-8">
            <div className="w-full">
                <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
                <Row gutter={16}>
                    <Col span={8}>
                        <div className="mb-4 min-h-[20vh] bg-white shadow rounded px-2 py-5">
                            <div className="flex items-center">
                                <MdBorderClear size={30} className="mr-2" />
                                <h3 className="text-[18px] leading-5 font-[400] text-[#00000085]">
                                    All Orders
                                </h3>
                            </div>
                            <Statistic title="Total Orders" value={products.length} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="mb-4 min-h-[20vh] bg-white shadow rounded px-2 py-5">
                            <div className="flex items-center">
                                <AiOutlineMoneyCollect size={30} className="mr-2" />
                                <h3 className="text-[18px] leading-5 font-[400] text-[#00000085]">
                                    All Products
                                </h3>
                            </div>
                            <Statistic title="Total Products" value={products.length} />
                        </div>
                    </Col>
                </Row>
                <br />


            </div>
        </div>
    )
}

export default AdminContent
