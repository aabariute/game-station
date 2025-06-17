import { createReview, getUserReview } from "@/lib/actions/review-action";
import { Description, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import Modal from "../ui/Modal";
import StarRating from "./StarRating";

export default function ReviewForm({ productId, isOpen, setIsOpen }) {
  const [rating, setRating] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => getUserReview(productId),
  });

  useEffect(() => {
    async function getUserRating() {
      const res = await getUserReview(productId);
      setRating(res.rating);
    }
    getUserRating();
  }, []);

  function handleRating(rating) {
    setRating(rating);
  }

  async function onReviewSubmit(data) {
    const res = await createReview({ ...data, rating, product_id: productId });

    if (!res.success) return toast.error(res.message);

    toast.success(res.message);

    setIsOpen(false);
  }

  function inputClasses(hasError) {
    return `input ${hasError ? "border-2 border-red-500 focus:border-red-500" : ""}`;
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex-between">
        <DialogTitle as="h3" className="text-xl font-semibold">
          Write a Review
        </DialogTitle>
        <IoClose
          onClick={() => setIsOpen(false)}
          className="cursor-pointer text-2xl hover:text-pink-500"
        />
      </div>

      <Description as="p" className="mb-6 text-sm text-neutral-500">
        Share your thoughts with other customers
      </Description>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onReviewSubmit)}
      >
        <div className="flex items-center gap-4">
          <label className="ml-1 font-semibold" htmlFor="rating">
            Rating
          </label>
          <StarRating rating={rating} onSetRating={handleRating} />
        </div>

        {rating && (
          <>
            <div className="flex flex-col gap-1">
              <label className="ml-1 font-semibold" htmlFor="title">
                Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                id="title"
                placeholder="Enter title"
                className={inputClasses(errors.title)}
              />
              {errors.title && (
                <span className="text-xs text-red-600">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="ml-1 font-semibold" htmlFor="description">
                Description
              </label>
              <textarea
                className="textarea"
                {...register("description", { required: false })}
                placeholder="Enter description"
              />
            </div>

            <button
              className="button-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}
