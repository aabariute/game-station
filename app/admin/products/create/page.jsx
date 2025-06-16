import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Create product",
};

export default async function Page() {
  return (
    <section>
      <div className="grid grid-cols-[auto_auto] md:grid-cols-[100px_auto_100px] mb-8 items-center">
        <Link href="/admin/products">
          <button className="button-primary flex-between gap-1">
            <FiArrowLeft className="text-[18px]" />
            <span>Products</span>
          </button>
        </Link>
        <h2 className="md:col-2 text-2xl font-bold uppercase text-right md:text-center">
          Create Product
        </h2>
      </div>

      <ProductForm type="Create" />
    </section>
  );
}
