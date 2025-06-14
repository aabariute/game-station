"use client";

import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NotificationBar() {
  return (
    <div className="bg-neutral-800 dark:bg-black text-white tracking-wide py-[0.35rem] text-nowrap overflow-hidden text-xs">
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
            <HiSparkles className="text-amber-400 w-10" />
            <div>
              Use <span className="font-bold">APP15</span> to save up additional
              15%
            </div>
            <HiSparkles className="text-amber-400 w-10" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/products" className="flex-center">
            <HiSparkles className="text-amber-400 w-10" />
            <span>Free shipping for all orders over $50</span>
            <HiSparkles className="text-amber-400 w-10" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
