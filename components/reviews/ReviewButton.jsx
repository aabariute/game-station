"use client";

import Link from "next/link";
import { useState } from "react";
import { PiNotePencilLight } from "react-icons/pi";
import ReviewForm from "./ReviewForm";

export default function ReviewButton({ userId, productId }) {
  let [isOpen, setIsOpen] = useState(false);

  if (!userId) {
    return (
      <div className="my-3 sm:my-0">
        Please{" "}
        <Link className="button-tertiary mx-1 inline" href="/login">
          sign in
        </Link>{" "}
        to write a review
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="button-secondary my-3 sm:my-0"
      >
        <PiNotePencilLight className="mr-2 text-[18px]" />
        Write a review
      </button>

      <ReviewForm productId={productId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
