"use client";

import { updateOrderToDelivered } from "@/lib/actions/order-actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function MarkAsDeliveredButton({ order_id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleUpdateOrder(order_id) {
    startTransition(async () => {
      const res = await updateOrderToDelivered(order_id);

      if (res.success) {
        router.refresh();
      }
    });
  }

  return (
    <button
      onClick={() => handleUpdateOrder(order_id)}
      disabled={isPending}
      className="button-secondary mt-4 md:mt-auto"
    >
      {isPending ? "Updating..." : "Mark as delivered"}
    </button>
  );
}
