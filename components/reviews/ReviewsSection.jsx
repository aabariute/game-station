import { auth } from "@/auth";
import { getReviews } from "@/lib/actions/review-action";
import ReviewButton from "./ReviewButton";
import ReviewList from "./ReviewList";

export default async function ReviewsSection({ productId }) {
  const session = await auth();
  const userId = session?.user?.id || undefined;

  const reviews = await getReviews(productId);

  return (
    <section>
      <div>
        <div className="mb-2 sm:flex sm:justify-between sm:items-center">
          <h3 className="text-2xl font-semibold">Customer Reviews</h3>
          <ReviewButton userId={userId} productId={productId} />
        </div>
        <hr className="mb-6 border-neutral-300 dark:border-neutral-600" />

        {!reviews ||
          (reviews.length === 0 && (
            <p className="ml-1 mb-6 text-neutral-500 italic text-sm">
              This product has no reviews.
            </p>
          ))}
      </div>

      {reviews.length > 0 && (
        <ReviewList productId={productId} userId={userId} reviews={reviews} />
      )}
    </section>
  );
}
