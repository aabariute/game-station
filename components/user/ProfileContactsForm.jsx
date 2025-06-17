"use client";

import { updateUser } from "@/lib/actions/user-actions";
import { DialogTitle } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import LabeledInput from "../ui/LabeledInput";
import Modal from "../ui/Modal";

export default function ProfileContactsForm() {
  const { data: session, update } = useSession();
  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: session?.user?.name.split(" ").at(0) || "",
      last_name: session?.user?.name.split(" ").at(-1) || "",
    },
  });

  async function onFormSubmit(data) {
    const name = `${data.first_name} ${data.last_name}`;

    const res = await updateUser({ name });

    if (!res.success) return toast.error(res.message);

    // Update session
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: `${data.first_name} ${data.last_name}`,
      },
    };
    await update(newSession);

    toast.success(res.message);

    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <CiEdit className="hover-fade-text mb-[-1.5px] text-[17px]" />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex-between mb-8">
          <DialogTitle as="h3" className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <IoClose
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-2xl hover:text-pink-500"
          />
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <LabeledInput
                {...register("first_name", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                label="First name"
                htmlFor="first_name"
                error={errors.first_name}
              />
              {errors.first_name && (
                <span className="text-xs text-red-600">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <LabeledInput
                {...register("last_name", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                label="Last name"
                htmlFor="last_name"
                error={errors.last_name}
              />
              {errors.last_name && (
                <span className="text-xs text-red-600">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <input
              className="input"
              placeholder={session?.user?.email ?? ""}
              label="Email"
              disabled
            />
            <span className="col-span-2 text-xs text-neutral-500">
              Email used for login can not be changed
            </span>
          </div>

          <button
            type="submit"
            className="button-primary w-24 self-end"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </>
  );
}
