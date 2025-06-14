"use client";

import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import ReviewForm from "../reviews/ReviewForm";

export default function OrderReviewButton({ rating, product_id }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {rating ? (
          <span className="cursor-pointer">
            {Array.from({ length: rating }, (_, i) => i + 1).map((num) => (
              <IoStar key={num} className="inline text-[17px]" />
            ))}
            {Array.from({ length: 5 - rating }, (_, i) => i + 1).map((num) => (
              <IoStarOutline key={num} className="inline text-[17px]" />
            ))}
          </span>
        ) : (
          <button className="button-tertiary text-sm pb-[0.075rem]">
            Write a Review
          </button>
        )}
      </div>
      <ReviewForm
        productId={product_id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
