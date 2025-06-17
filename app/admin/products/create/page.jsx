import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Create product",
};

export default async function Page() {
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
          Create Product
        </h2>
      </div>

      <ProductForm type="Create" />
    </section>
  );
}
