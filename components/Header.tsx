"use client";

import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex top-0 z-50 fixed w-full bg-white dark:bg-dark-700 justify-between items-center border border-t-0 border-l-0 border-r-0 border-b-2 p-3 dark:border-dark-500">
      <div>
        <Image src="/imgs/favicon.ico" alt="Logo" width={45} height={45} />
      </div>
      <div className="font-dancingScript text-4xl dark:text-dark-50">
        Poster
      </div>
      <div className="flex">
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex justify-center items-center border h-10 w-10  mr-3 border-dark-50 cursor-pointer  dark:border-dark-400 active:translate-y-0.5"
          style={{ borderRadius: "0.3rem" }}
        >
          {theme === "light" ? (
            <FaRegMoon className="text-xl text-dark-300" />
          ) : (
            <IoSunnyOutline className="text-xl text-dark-300 dark:text-dark-100" />
          )}
        </div>
        <Link href="https://github.com/Navneet-divine/poster">
          <div
            className="flex justify-center items-center border h-10 w-10 rounded-md border-dark-50 cursor-pointer dark:border-dark-400 active:translate-y-0.5"
            style={{ borderRadius: "0.3rem" }}
          >
            <FaGithub className="text-xl text-dark-300 dark:text-dark-100" />
          </div>
        </Link>
      </div>
    </div>
  );
}
