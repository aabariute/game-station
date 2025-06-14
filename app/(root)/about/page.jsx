import Image from "next/image";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <section className="pt-4 pb-8 px-4 max-w-6xl mx-auto font-light w-full flex flex-col gap-10">
      <article className="flex-center flex-col md:flex-row gap-2 md:gap-8">
        <div className="relative h-58 aspect-[4/3]">
          <Image
            src="about-1.svg"
            alt="Image"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="mb-4 text-center text-xl font-semibold">
            We set the highest requirements for selected products
          </h2>
          <p>
            We are dedicated to providing the latest and greatest in technology,
            from cutting-edge gadgets to essential accessories. Our mission is
            to empower our customers with innovative solutions that enhance
            their daily lives.
          </p>
        </div>
      </article>

      <article className="flex-center flex-col-reverse md:flex-row gap-8">
        <div>
          <h2 className="mb-4 text-center text-xl font-semibold">
            We proudly offer a guarantee on all repairs
          </h2>
          <p>
            We specialize in fast and reliable repairs for smartphones, tablets,
            and laptops. Our expert technicians use quality parts to fix issues
            like cracked screens and battery problems, ensuring your device is
            back in working order quickly.
          </p>
        </div>
        <div className="relative h-58 aspect-[4/3]">
          <Image
            src="about-2.svg"
            alt="Image"
            fill
            className="object-contain"
          />
        </div>
      </article>

      <article className="flex-center flex-col md:flex-row gap-8">
        <div className="relative h-58 aspect-[4/3]">
          <Image
            src="about-3.svg"
            alt="Image"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="mb-4 text-center text-xl font-semibold">
            We provide fast delivery
          </h2>
          <p>
            We prioritize efficient delivery to ensure you receive your devices
            as quickly as possible. Our streamlined process minimizes wait
            times, so you can enjoy your technology without interruption.
          </p>
        </div>
      </article>

      <article className="flex-center flex-col-reverse md:flex-row gap-6 md:gap-8">
        <div>
          <h2 className="mb-4 text-center text-xl font-semibold">
            We ensure secure & trusted payment process
          </h2>
          <p>
            We guarantee safe and secure payments on our website by using
            encrypted payment gateways that protect your sensitive information.
            Your transactions are processed through trusted providers, keeping
            your card details private and secure at all times.
          </p>
        </div>
        <div className="relative h-58 aspect-[4/3]">
          <Image
            src="about-4.svg"
            alt="Image"
            fill
            className="object-contain"
          />
        </div>
      </article>
    </section>
  );
}
