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
        <div className="mb-2 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-2xl font-semibold">Customer Reviews</h3>
          <ReviewButton userId={userId} productId={productId} />
        </div>
        <hr className="mb-6 border-neutral-300 dark:border-neutral-600" />

        {!reviews ||
          (reviews.length === 0 && (
            <p className="mb-6 ml-1 text-sm text-neutral-500 italic">
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
