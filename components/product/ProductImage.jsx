import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ images, discount }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative flex w-full flex-col">
      {discount && (
        <span className="bg-accent-magenta-foreground absolute top-4 left-4 z-4 h-[55px] w-[55px] rounded-full text-center text-[15px] leading-[55px] text-white">
          -{discount}%
        </span>
      )}

      <div className="relative min-h-[25rem] w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 * index}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full min-w-full">
              <Image
                src={img}
                fill
                alt="Product image"
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative h-[80px] w-[80px] cursor-pointer overflow-hidden rounded-md border-[2.5px] ${
              i === index ? "border-accent-magenta" : "border-primary-300"
            }`}
          >
            <Image
              src={img}
              alt="Thumbnail"
              fill
              className="object-contain p-2"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
