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
    <div className="mx-auto w-full max-w-7xl px-2 py-8 md:px-4">
      {searchQuery && products.length > 0 && (
        <div className="flex-center mb-4 gap-2">
          <Link href="/products">
            <AiFillCloseSquare className="text-accent-indigo hover:text-accent-indigo-foreground text-2xl duration-150" />
          </Link>
          <p>
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            found for &quot;{searchQuery}
            &quot;
          </p>
        </div>
      )}

      {products.length > 0 ? (
        <section>
          <div className="mb-4 ml-2">
            <FilterModal filterOptions={filterOptions} />
          </div>

          <article className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </article>
        </section>
      ) : (
        <section className="flex items-center py-10">
          <div className="mx-auto max-w-xl text-center">
            <span className="dark:bg-accent-indigo mb-2 inline-block rounded-full bg-indigo-200 p-4">
              <PiMagnifyingGlassLight className="h-8 w-8" />
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
              <Link href="/products" className="button-tertiary mx-1 inline">
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
