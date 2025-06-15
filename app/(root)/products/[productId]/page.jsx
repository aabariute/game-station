import ProductDetails from "@/components/product/ProductDetails";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import Spinner from "@/components/ui/Spinner";
import { getProductById } from "@/lib/actions/product-actions";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { title } = await getProductById(productId);
  return { title: title };
}

export default async function Page({ params }) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 md:px-8 py-10 flex flex-col gap-y-16">
      <ProductDetails product={product} />

      <Suspense
        fallback={
          <section className="my-10">
            <Spinner />
          </section>
        }
      >
        <ReviewsSection productId={productId} />
      </Suspense>
    </div>
  );
}
