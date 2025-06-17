"use client";

import { getRecentProducts } from "@/lib/actions/product-actions";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./product/ProductCard";
import Spinner from "./ui/Spinner";

export default function RecentProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getRecentProducts().then(setProducts);
  }, []);

  if (!products) return <Spinner />;

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      loop={true}
      speed={6000}
      slidesPerView="auto"
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      allowTouchMove={true}
      className="swiper-transition w-full"
    >
      {products.map((p) => (
        <SwiperSlide key={p.product_id} className="!w-76 py-4">
          <ProductCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
