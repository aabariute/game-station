"use client";

import { createOrder } from "@/lib/actions/order-actions";
import { SERVER_URL } from "@/lib/constants";
import { priceFormatter } from "@/lib/utils";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Spinner from "../ui/Spinner";

export default function CheckoutPaymentForm({ clientSecret, price }) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
  const [mode, setMode] = useState("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setMode(e.matches ? "dark" : "light"));

    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mt-10 mb-4 text-xl font-semibold">Payment</h3>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: mode === "dark" ? "night" : "stripe",
            variables: {
              colorPrimary: mode === "dark" ? "#a3a3a3" : "#372aac",
              colorText: mode === "dark" ? "#fff" : "#171717",
            },
          },
        }}
      >
        <StripeForm clientSecret={clientSecret} price={price} />
      </Elements>
    </div>
  );
}

function StripeForm({ clientSecret, price }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentElementReady, setPaymentElementReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const res = await createOrder();
    if (!res.success) {
      setErrorMessage(res.message);
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${SERVER_URL}/payment-success?id=${res.id}`,
      },
    });

    if (error) setErrorMessage(error.message);

    setIsLoading(false);
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <section className="my-16">
        <Spinner />
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-y-8">
      <div>
        <PaymentElement
          onReady={() => setPaymentElementReady(true)}
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
        {errorMessage && (
          <p className="mt-4 text-center text-red-600">
            <span className="font-bold">ERROR:</span> {errorMessage}
          </p>
        )}
      </div>

      {paymentElementReady && (
        <div className="flex-between mt-8 xl:mt-auto">
          <Link
            href="/checkout/shipping"
            className="button-secondary flex-center w-26 gap-1"
            aria-disabled={isLoading}
          >
            <FiArrowLeft className="text-[18px]" />
            <span>Back</span>
          </Link>

          <button
            type="submit"
            disabled={!stripe || !elements || isLoading}
            className="button-primary w-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : `Pay now ${priceFormatter(price / 100)}`}
          </button>
        </div>
      )}
    </form>
  );
}
