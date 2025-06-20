import RecentProducts from "@/components/RecentProducts";
import Spinner from "@/components/ui/Spinner";
import banner from "@/public/banner.jpg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  description: "Ecommerce store built with Next.js.",
};

export default async function Page() {
  return (
    <>
      <section className="relative mb-20 flex h-[75vh] flex-col items-start justify-center">
        <div className="z-5 flex max-w-[54rem] flex-col items-center gap-36 px-8 md:px-12 lg:px-16">
          <div>
            <h2 className="mb-6 flex flex-col items-start gap-2 text-5xl drop-shadow-sm md:text-6xl lg:text-7xl">
              <span className="font-extralight text-neutral-100">
                Gear Up for the
              </span>
              <span className="highlight ml-12 md:ml-24 lg:ml-32">
                Future of Play
              </span>
            </h2>
            <p className="max-w-[20rem] font-thin text-neutral-100 drop-shadow-sm md:max-w-[28rem] md:text-lg xl:text-xl">
              Premium peripherals & pro-grade gear for every gamer and creator.
            </p>
          </div>

          <Link href="/products" className="button-primary">
            Shop the Gear
          </Link>
        </div>

        <Image
          src={banner}
          alt="Banner"
          quality={40}
          fill
          className="absolute object-cover object-top"
        />
      </section>

      <section className="mb-16">
        <h3 className="mb-8 ml-8 text-xl md:ml-14 md:text-2xl lg:ml-20 lg:text-3xl">
          <span className="font-semibold">The latest. </span>
          <span className="text-primary-600">
            Take a look at what&apos;s new.
          </span>
        </h3>

        <Suspense fallback={<Spinner />}>
          <RecentProducts />
        </Suspense>
      </section>
    </>
  );
}
