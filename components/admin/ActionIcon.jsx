import Link from "next/link";

export default function ActionIcon({ children, href }) {
  return (
    <Link
      href={href}
      className="border-primary-300 dark:border-primary-600 hover:bg-primary-100 dark:hover:bg-primary-300 cursor-pointer rounded-md border p-2"
    >
      {children}
    </Link>
  );
}
