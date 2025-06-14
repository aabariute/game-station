import { IoStar, IoStarOutline } from "react-icons/io5";

export default function ReviewSummary({
  reviews,
  filteredByStars,
  setFilteredByStars,
}) {
  const averageRating =
    reviews.length !== 0 &&
    (
      reviews.reduce((acc, cur) => cur.rating + acc, 0) / reviews.length
    ).toFixed(2);

  return (
    <div className="mb-6 flex-center flex-col-reverse gap-4 md:gap-0 md:flex-row">
      <div className="flex flex-col-reverse md:border-r-1 md:border-neutral-300 md:pr-24">
        {filteredByStars && (
          <div className="col-span-full flex justify-center mt-4 text-center">
            <button
              className="button-tertiary text-sm"
              onClick={() => setFilteredByStars("")}
            >
              See all reviews
            </button>
          </div>
        )}

        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <ProductRatingSummary
            reviews={reviews}
            stars={num}
            filteredByStars={filteredByStars}
            setFilteredByStars={setFilteredByStars}
            key={num}
          />
        ))}
      </div>

      <div className="pl-8 md:pl-24 flex flex-col items-center">
        <div className="flex items-center text-lg mb-[0.1rem]">
          <IoStar className="text-[16px] mr-1 text-pink-600" />
          <div>
            <span className="mr-2 font-semibold text-pink-600">
              {averageRating}
            </span>
            <span>
              out of <span className="mx-1 font-semibold text-pink-600">5</span>
            </span>
          </div>
        </div>

        <span className="text-sm">
          Based on {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>
    </div>
  );
}

function ProductRatingSummary({
  reviews,
  stars,
  filteredByStars,
  setFilteredByStars,
}) {
  return (
    <div
      onClick={() =>
        reviews.length > 1 &&
        reviews.filter((review) => review.rating === stars).length > 0
          ? setFilteredByStars(stars)
          : null
      }
      className={`dark:text-neutral-300 grid grid-cols-[auto_auto_auto] items-center gap-x-6 mb-[1px] ${
        filteredByStars === stars ? "opacity-65 cursor-pointer" : ""
      } ${
        reviews.length === 1 ||
        reviews.filter((review) => review.rating === stars).length === 0
          ? ""
          : "hover:opacity-65 cursor-pointer"
      }`}
    >
      <span className="flex mb-1">
        {Array.from({ length: stars }, (_, i) => i + 1).map((num) => (
          <IoStar className="text-[17px]" key={num} />
        ))}
        {5 - stars !== 0 &&
          Array.from({ length: 5 - stars }, (_, i) => i + 1).map((num) => (
            <IoStarOutline className="text-[17px]" key={num} />
          ))}
      </span>

      <div className="float-left w-[150px]">
        <div className="w-full bg-neutral-200 dark:bg-neutral-300 rounded-full">
          <div
            className="h-[14px] bg-neutral-900 dark:bg-neutral-700 rounded-full"
            style={{
              width: `${Math.round(
                (reviews.filter((review) => review.rating === stars).length /
                  reviews.length) *
                  100
              )}%`,
            }}
          ></div>
        </div>
      </div>

      <span className="text-sm">
        {reviews.filter((review) => review.rating === stars).length}
      </span>
    </div>
  );
}
