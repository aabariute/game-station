import { deleteProduct } from "@/lib/actions/product-actions";
import { Description, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "../ui/Modal";

export default function ProductDeleteButton({ productId }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteProduct(productId) {
    const res = await deleteProduct(productId);

    if (res.success) setIsOpen(false);
  }

  return (
    <>
      <button className="border-primary-300 dark:border-primary-600 hover:bg-primary-100 dark:hover:bg-primary-300 cursor-pointer rounded-md border p-2">
        <FaTrash className="text-[16px]" onClick={() => setIsOpen(true)} />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle as="h3" className="text-xl font-semibold">
          Are you sure?
        </DialogTitle>
        <Description as="p" className="text-primary-600 mt-2 mb-6">
          This will permanently delete a product from database.
        </Description>
        <div className="flex-between mt-16">
          <button className="button-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            className="button-danger"
            onClick={() => handleDeleteProduct(productId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
