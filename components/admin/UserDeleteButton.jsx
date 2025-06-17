"use client";

import { deleteUser } from "@/lib/actions/user-actions";
import { Description, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Modal from "../ui/Modal";

export default function UserDeleteButton({ userId, userName }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteUser(userId) {
    const res = await deleteUser(userId);

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    setIsOpen(false);
  }

  return (
    <>
      <button className="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
        <FaTrash className="text-[16px]" onClick={() => setIsOpen(true)} />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle as="h3" className="text-xl font-semibold">
          Are you sure?
        </DialogTitle>
        <Description
          as="p"
          className="mt-2 text-neutral-700 dark:text-neutral-300"
        >
          This will permanently delete user{" "}
          <span className="px-1 font-medium">{userName}</span> from database.
        </Description>
        <div className="flex-between mt-16 gap-4">
          <button className="button-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            className="button-danger"
            onClick={() => handleDeleteUser(userId)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
