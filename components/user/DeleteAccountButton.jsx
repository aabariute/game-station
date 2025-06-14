"use client";

import { signOutUser } from "@/lib/actions/auth-actions";
import { deleteUserAccount } from "@/lib/actions/user-actions";
import { Description, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import Modal from "../ui/Modal";

export default function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteAccount() {
    const res = await deleteUserAccount();

    if (res.success) await signOutUser();
  }

  return (
    <div className="mb-4">
      <button className="button-danger" onClick={() => setIsOpen(true)}>
        Delete Account
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle as="h3" className="font-semibold text-xl">
          Are you sure?
        </DialogTitle>
        <Description
          as="p"
          className="mt-2 mb-14 text-sm text-neutral-700 dark:text-neutral-300"
        >
          This will permanently delete your account and all associated data.
          This action cannot be undone.
        </Description>

        <div className="flex-between">
          <button className="button-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button className="button-primary" onClick={handleDeleteAccount}>
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
