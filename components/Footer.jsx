import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";

export default function Footer() {
  const year = new Date();

  return (
    <footer className="flex-center flex-col gap-6 bg-neutral-800 pt-6 pb-10 text-center text-white dark:bg-black">
      <ul className="flex gap-3 text-xl">
        <FooterIcon>
          <FaInstagram className="text-2xl" />
        </FooterIcon>
        <FooterIcon>
          <FaLinkedinIn />
        </FooterIcon>
        <FooterIcon>
          <TiSocialFacebook className="text-2xl" />
        </FooterIcon>
        <FooterIcon>
          <FaTiktok />
        </FooterIcon>
      </ul>

      <p>
        © {year.getFullYear()} Game station.{" "}
        <span className="text-neutral-200">All Rights Reserved.</span>
      </p>
    </footer>
  );
}

function FooterIcon({ children }) {
  return (
    <li className="flex-center h-[40px] w-[40px] rounded-full bg-white/20 transition-all duration-300 hover:bg-neutral-700">
      <Link href="/">{children}</Link>
    </li>
  );
}
