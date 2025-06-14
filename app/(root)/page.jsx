import RecentProducts from "@/components/hero/RecentProducts";
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
      <section className="mb-20 relative h-[75vh] flex flex-col justify-center items-start">
        <div className="z-5 px-8 md:px-12 lg:px-16 max-w-[54rem] flex flex-col items-center gap-36">
          <div>
            <h2 className="mb-6 text-5xl md:text-6xl lg:text-7xl drop-shadow-sm flex flex-col items-start gap-2">
              <span className="font-extralight text-neutral-100">
                Gear Up for the
              </span>
              <span className="highlight ml-12 md:ml-24 lg:ml-32">
                Future of Play
              </span>
            </h2>
            <p className="max-w-[20rem] md:max-w-[28rem] font-thin md:text-lg xl:text-xl text-neutral-100 drop-shadow-sm">
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
        <h3 className="mb-8 ml-8 md:ml-14 lg:ml-20 text-xl md:text-2xl lg:text-3xl">
          <span className="font-semibold">The latest. </span>
          <span className="text-neutral-600 dark:text-neutral-400">
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
