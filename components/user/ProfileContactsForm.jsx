"use client";

import { updateUser } from "@/lib/actions/user-actions";
import { DialogTitle } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import LabeledInput from "../ui/input/LabeledInput";
import Modal from "../ui/Modal";

export default function ProfileContactsForm() {
  const router = useRouter();
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
    if (!res.success) {
      // handle error
      return;
    }

    // Update session
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: `${data.first_name} ${data.last_name}`,
      },
    };
    await update(newSession);

    // router.refresh();

    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <CiEdit className="hover-fade-text text-[17px] mb-[-1.5px]" />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex-between mb-8">
          <DialogTitle as="h3" className="font-semibold text-xl">
            Edit Profile
          </DialogTitle>
          <IoClose
            onClick={() => setIsOpen(false)}
            className="text-2xl cursor-pointer hover:text-pink-500"
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
                <span className="text-red-600 text-xs">
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
                <span className="text-red-600 text-xs">
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
            <span className="col-span-2 text-neutral-500 text-xs">
              Email used for login can not be changed
            </span>
          </div>

          <button
            type="submit"
            className="button-primary self-end w-24"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </>
  );
}
