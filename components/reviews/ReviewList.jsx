"use client";

import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { PiCheckCircleFill } from "react-icons/pi";
import ReviewSummary from "./ReviewSummary";

export default function ReviewList({ reviews }) {
  const [filteredByStars, setFilteredByStars] = useState("");
  const filteredReviews = filteredByStars
    ? reviews.filter((review) => review.rating === filteredByStars)
    : reviews;

  return (
    <>
      <ReviewSummary
        reviews={reviews}
        filteredByStars={filteredByStars}
        setFilteredByStars={setFilteredByStars}
      />

      <div className="divide-primary-200 mx-1 divide-y">
        {filteredReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}

function Review({ review }) {
  const { created_at, rating, is_verified_purchase, title, description, name } =
    review;
  const [first_name, last_name] = name.split(" ");

  return (
    <div className="mb-4 flex flex-col gap-1 py-4">
      <div className="flex-between">
        <div>
          {Array.from({ length: rating }, (_, i) => i + 1).map((num) => (
            <IoStar key={num} className="inline text-[17px]" />
          ))}
          {Array.from({ length: 5 - rating }, (_, i) => i + 1).map((num) => (
            <IoStarOutline key={num} className="inline text-[17px]" />
          ))}
        </div>
        {is_verified_purchase && (
          <div className="flex-center border-primary-300 rounded-full border px-2 py-1 text-sm">
            <PiCheckCircleFill className="mr-1 text-[18px]" />
            <span className="mb-[1px]">Verified Purchase</span>
          </div>
        )}
      </div>
      <h5 className="font-semibold">{title}</h5>
      <p className="text-primary-500 mt-2 mb-3">{description}</p>
      {name.toLowerCase() === "deleted user" ? (
        <p className="text-sm">
          Posted {created_at.slice(0, 10)}{" "}
          <span className="text-primary-500">(Deleted user)</span>
        </p>
      ) : (
        <p className="text-sm">
          Posted {created_at.slice(0, 10)} by {first_name} {last_name.at(0)}.
        </p>
      )}
    </div>
  );
}
