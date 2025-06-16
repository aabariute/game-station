"use client";

import { updateOrderToDelivered } from "@/lib/actions/order-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function MarkAsDeliveredButton({ orderId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleUpdateOrder(orderId) {
    startTransition(async () => {
      const res = await updateOrderToDelivered(orderId);

      if (!res.success) return toast.error(res.message);

      toast.success(res.message);

      router.refresh();
    });
  }

  return (
    <button
      onClick={() => handleUpdateOrder(orderId)}
      disabled={isPending}
      className="button-secondary mt-4 md:mt-auto"
    >
      {isPending ? "Updating..." : "Mark as delivered"}
    </button>
  );
}
