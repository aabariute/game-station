import FilterModal from "@/components/filter/FilterModal";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/product/ProductCard";
import {
  getAllProducts,
  getFilterOptions,
} from "@/lib/actions/product-actions";
import Link from "next/link";
import { AiFillCloseSquare } from "react-icons/ai";
import { PiMagnifyingGlassLight } from "react-icons/pi";

export const metadata = {
  title: "Products",
};

export default async function Products({ searchParams }) {
  const {
    q: searchQuery,
    category,
    brand,
    color,
    sort,
    page = "1",
  } = await searchParams;

  const filterOptions = await getFilterOptions();
  const { products, total, totalPages } = await getAllProducts({
    query: searchQuery,
    category,
    brand,
    color,
    page: Number(page),
  });

  // Apply sorting based on variants (MANUAL SORT)
  if (sort) {
    products.sort((a, b) => {
      const getLowest = (variants, key) =>
        Math.min(...variants.map((v) => v[key] ?? Infinity));
      const getHighest = (variants, key) =>
        Math.max(...variants.map((v) => v[key] ?? -Infinity));

      switch (sort) {
        case "price-asc":
          return (
            getLowest(a.variants, "price") - getLowest(b.variants, "price")
          );
        case "price-desc":
          return (
            getHighest(b.variants, "price") - getHighest(a.variants, "price")
          );
        case "discount":
          return (
            getHighest(b.variants, "discount") -
            getHighest(a.variants, "discount")
          );
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });
  }

  return (
    <div className="py-8 xl:mx-28">
      {/* <div className="py-8 mx-auto xl:max-w-[calc(100vw-300px)] w-full"> */}
      {searchQuery && products.length > 0 && (
        <div className="flex items-center gap-2 ml-6 mb-4">
          <Link href="/products">
            <AiFillCloseSquare className="text-2xl text-indigo-700" />
          </Link>
          <p>
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            found for &quot;{searchQuery}
            &quot;
          </p>
        </div>
      )}

      {products.length > 0 ? (
        <section className="px-2 md:px-4">
          <div className="ml-2 mb-4">
            <FilterModal filterOptions={filterOptions} />
          </div>

          <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </article>
        </section>
      ) : (
        <section className="flex items-center">
          <div className="max-w-xl mx-auto text-center">
            <span className="bg-indigo-200 dark:bg-indigo-700 rounded-full p-4 mb-2 inline-block">
              <PiMagnifyingGlassLight className="w-8 h-8" />
            </span>
            <p className="mb-4 text-lg font-semibold">
              No results found{" "}
              {searchQuery && (
                <span>
                  for &quot;{searchQuery}
                  &quot;
                </span>
              )}
            </p>
            <p className="text-sm">
              Sorry, we can't find any products that match your filters. Please
              <Link href="/products" className="mx-1 button-tertiary inline">
                clear
              </Link>
              your selected filters and try again.
            </p>
          </div>
        </section>
      )}

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </div>
  );
}
