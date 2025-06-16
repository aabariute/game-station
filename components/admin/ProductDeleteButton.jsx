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
      <button className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
        <FaTrash className="text-[16px]" onClick={() => setIsOpen(true)} />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle as="h3" className="font-semibold text-xl">
          Are you sure?
        </DialogTitle>
        <Description
          as="p"
          className="mt-2 text-neutral-700 dark:text-neutral-300"
        >
          This will permanently delete a product from database.
        </Description>
        <div className="mt-16 flex-between">
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
