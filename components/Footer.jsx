import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";

export default function Footer() {
  const year = new Date();

  return (
    <footer className="pt-6 pb-10 bg-neutral-800 dark:bg-black text-white text-center flex-center flex-col gap-6">
      <ul className="text-xl flex gap-3">
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
    <li className="w-[40px] h-[40px] bg-white/20 rounded-full flex-center hover:bg-neutral-700 transition-all duration-300">
      <Link href="/">{children}</Link>
    </li>
  );
}
