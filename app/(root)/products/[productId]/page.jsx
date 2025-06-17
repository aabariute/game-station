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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-16 px-2 py-8 md:px-4">
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
