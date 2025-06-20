import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function StarRating({ rating, onSetRating }) {
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    onSetRating(rating);
  }

  function handleTempRating(rating) {
    setTempRating(rating);
  }

  return (
    <div className="flex items-center gap-[16px]">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => handleTempRating(i + 1)}
            onHoverOut={() => handleTempRating(0)}
          />
        ))}
      </div>
    </div>
  );
}

function Star({ full, onRate, onHoverIn, onHoverOut }) {
  return (
    <span
      role="button"
      className="px-[1px]"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <IoStar className="text-primary-900 cursor-pointer text-[17px]" />
      ) : (
        <IoStarOutline className="cursor-pointer text-[17px]" />
      )}
    </span>
  );
}
