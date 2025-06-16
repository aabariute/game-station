"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "../product/ProductCard";

export default function ProductCarousel({ products }) {
  return (
    <div>
      <Swiper
        modules={[Autoplay, FreeMode, Navigation]}
        navigation={true}
        slidesPerView="auto"
        spaceBetween={30}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        className="w-full"
      >
        {products.map((p) => (
          <SwiperSlide key={p.product_id} className="!w-80 py-4">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
