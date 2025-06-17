import ProductsTable from "@/components/admin/ProductsTable";
import SortBy from "@/components/admin/SortBy";
import Pagination from "@/components/Pagination";
import { getAllProducts } from "@/lib/actions/product-actions";
import Link from "next/link";

export const metadata = {
  title: "Products",
};

const sortOptions = [
  { value: "brand-desc", label: "Brand: A-Z" },
  { value: "brand-asc", label: "Brand: Z-A" },
  { value: "category-desc", label: "Category: A-Z" },
  { value: "category-asc", label: "Category: Z-A" },
];

export default async function Page({ searchParams }) {
  const { page = "1", sort } = await searchParams;
  const { products, total, totalPages } = await getAllProducts({ page, sort });

  return (
    <section>
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide uppercase">
        Products
      </h2>

      <div className="flex-between mb-4">
        <Link href="/admin/products/create" className="button-primary">
          + Create new
        </Link>
        <SortBy sortOptions={sortOptions} />
      </div>

      <ProductsTable products={products} />

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </section>
  );
}
