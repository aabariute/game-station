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
  // pataisyt
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function Layout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="antialiased flex flex-col min-h-screen dark:bg-[var(--color-dark-bg)] text-neutral-900 dark:text-neutral-100">
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
