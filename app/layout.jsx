import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

import "./globals.css";

export const metadata = {
  title: {
    template: "%s / GAME STATION",
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
      </body>
    </html>
  );
}
