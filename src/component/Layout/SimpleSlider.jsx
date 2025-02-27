import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Bật chế độ tự động chuyển đổi
        autoplaySpeed: 3000 // Thiết lập thời gian chuyển đổi là 3 giây (3000ms)
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src="https://cdn.kiotvietweb.vn/merchant/1fb4ae1f6d40d69dfa13e50dcfeb6e6c/cropped/1729325477/crop-file.webp" alt="" />
                </div>
                <div>
                    <img src="https://cdn.kiotvietweb.vn/merchant/1fb4ae1f6d40d69dfa13e50dcfeb6e6c/cropped/1729346303/crop-file.webp" alt="" />
                </div>
                <div>
                    <img src="https://cdn.kiotvietweb.vn/merchant/1fb4ae1f6d40d69dfa13e50dcfeb6e6c/cropped/1729346363/crop-file.webp" alt="" />
                </div>
            </Slider>
        </div>
    );
}

export default SimpleSlider;
