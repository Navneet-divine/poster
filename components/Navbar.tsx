"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const Navbar: React.FC<NavBarProps> = ({ icon, name, link }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`${
        pathname === link
          ? "bg-pink-500 rounded-md p-1 text-white"
          : "text-dark-200"
      } flex flex-col items-center justify-center`}
    >
      <div>{icon}</div>
      <div>
        <p className="text-xs font-raleway  dark:text-white">{name}</p>
      </div>
    </Link>
  );
};

export default Navbar;
