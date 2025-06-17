import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | GAME STATION",
    default: "GAME STATION",
  },
  description:
    "Shop high-performance gaming gear and accessories at Game Station. Get the latest products, exclusive discounts, and free shipping on orders over $50. Perfect for casual and pro gamers alike.",
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="flex min-h-screen flex-col text-neutral-900 antialiased dark:bg-[var(--color-dark-bg)] dark:text-neutral-100">
        {children}

        <Toaster
          position="bottom-center"
          gutter={8}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 4000 },
            style: {
              fontSize: "14px",
              maxWidth: "500px",
              padding: "8px 12px",
              color: "var(--color-neutral-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
