import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "../../styles/carousel/CarouselBanner.scss";

const mockImages = [
  { id: 0, imageUrl: "/img/carousel/carousel2.jpg"},
  { id: 1, imageUrl: "/img/carousel/carousel1.jpg"},
  { id: 2, imageUrl: "/img/carousel/carousel2.jpg"},
  { id: 3, imageUrl: "/img/carousel/carousel1.jpg"},
  { id: 4, imageUrl: "/img/carousel/carousel2.jpg"},
];

const CarouselBanner = () => {
  const multiBanner = mockImages.length > 1;

  return (
    <div className="carousel-container">
      <Swiper
        slidesPerView={1}
        loop={multiBanner}
        pagination={{
          clickable: true,
        }}
        navigation={multiBanner ? {
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }: false}
        autoplay={multiBanner ? {
          delay: 5000
        }: false}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {mockImages.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <img src={item.imageUrl} alt={`slide-${item.id}`} />
            </SwiperSlide>
          );
        })}
        
      </Swiper>
      {multiBanner && (
        <div className="nav-wrapper">
          <div className="custom-prev"></div>
          <div className="custom-next"></div>
        </div>
      )}
    </div>
  );
};

export default CarouselBanner;