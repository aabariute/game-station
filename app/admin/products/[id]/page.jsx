import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/actions/product-actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Update product",
};

export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <section>
      <div className="mb-8 grid grid-cols-[auto_auto] items-center md:grid-cols-[100px_auto_100px]">
        <Link
          href="/admin/products"
          className="button-primary flex-between gap-1"
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Products</span>
        </Link>
        <h2 className="text-right text-2xl font-bold uppercase md:col-2 md:text-center">
          Update Product
        </h2>
      </div>

      <ProductForm type="Update" product={product} productId={id} />
    </section>
  );
}
