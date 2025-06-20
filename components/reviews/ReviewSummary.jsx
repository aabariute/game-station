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
    <div className="flex-center mb-6 flex-col-reverse gap-4 md:flex-row md:gap-0">
      <div className="md:border-primary-300 flex flex-col-reverse md:border-r-1 md:pr-24">
        {filteredByStars && (
          <div className="col-span-full mt-4 flex justify-center text-center">
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

      <div className="flex flex-col items-center pl-8 md:pl-24">
        <div className="mb-[0.1rem] flex items-center text-lg">
          <IoStar className="text-accent-magenta-foreground mr-1 text-[16px]" />
          <div>
            <span className="text-accent-magenta-foreground mr-2 font-semibold">
              {averageRating}
            </span>
            <span>
              out of{" "}
              <span className="text-accent-magenta-foreground mx-1 font-semibold">
                5
              </span>
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
      className={`mb-[1px] grid grid-cols-[auto_auto_auto] items-center gap-x-6 ${
        filteredByStars === stars ? "cursor-pointer opacity-65" : ""
      } ${
        reviews.length === 1 ||
        reviews.filter((review) => review.rating === stars).length === 0
          ? ""
          : "cursor-pointer hover:opacity-65"
      }`}
    >
      <span className="mb-1 flex">
        {Array.from({ length: stars }, (_, i) => i + 1).map((num) => (
          <IoStar className="text-[17px]" key={num} />
        ))}
        {5 - stars !== 0 &&
          Array.from({ length: 5 - stars }, (_, i) => i + 1).map((num) => (
            <IoStarOutline className="text-[17px]" key={num} />
          ))}
      </span>

      <div className="float-left w-[150px]">
        <div className="bg-primary-200 w-full rounded-full">
          <div
            className="bg-primary-900 dark:bg-primary-700 h-[14px] rounded-full"
            style={{
              width: `${Math.round(
                (reviews.filter((review) => review.rating === stars).length /
                  reviews.length) *
                  100,
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
