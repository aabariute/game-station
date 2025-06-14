import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ images, discount }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative flex flex-col w-full">
      {discount && (
        <span className="absolute z-4 top-4 left-4 text-[15px] text-center w-[55px] h-[55px] leading-[55px] bg-pink-700 text-white rounded-full">
          -{discount}%
        </span>
      )}

      <div className="relative w-full min-h-[25rem] overflow-hidden">
        <div
          className="flex transition-transform ease-in-out duration-300 h-full"
          style={{ transform: `translateX(-${100 * index}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative min-w-full h-full">
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

      <div className="flex justify-center gap-3 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative cursor-pointer border-[2.5px] rounded-md h-[80px] w-[80px] overflow-hidden ${
              i === index
                ? "border-pink-500"
                : "border-neutral-300 dark:border-neutral-700"
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
