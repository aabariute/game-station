"use client";

import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NotificationBar() {
  return (
    <div className="overflow-hidden bg-neutral-800 py-[0.35rem] text-xs tracking-wide text-nowrap text-white dark:bg-black">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        <SwiperSlide>
          <Link href="/products" className="flex-center">
            <HiSparkles className="w-10 text-amber-400" />
            <div>
              Use <span className="font-bold">APP15</span> to save up additional
              15%
            </div>
            <HiSparkles className="w-10 text-amber-400" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/products" className="flex-center">
            <HiSparkles className="w-10 text-amber-400" />
            <span>Free shipping for all orders over $50</span>
            <HiSparkles className="w-10 text-amber-400" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
