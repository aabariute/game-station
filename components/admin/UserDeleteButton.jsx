"use client";

import { deleteUser } from "@/lib/actions/user-actions";
import { Description, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "../ui/Modal";

export default function UserDeleteButton({ user_id, userName }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteUser(user_id) {
    const res = await deleteUser(user_id);

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
          This will permanently delete user{" "}
          <span className="px-1 font-medium">{userName}</span> from database.
        </Description>
        <div className="mt-16 flex-between gap-4">
          <button className="button-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            className="button-danger"
            onClick={() => handleDeleteUser(user_id)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
