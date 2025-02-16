"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { usePathname } from "next/navigation";
import axios from "axios";

const navBar = [
  { title: "Home", icon: <FaHome className="text-2xl" />, link: "/dashboard" },
  { title: "People", icon: <MdPeople className="text-2xl" />, link: "/people" },
  {
    title: "Create",
    icon: <RiImageAddLine className="text-xl" />,
    link: "/create",
  },
  {
    title: "Saved",
    icon: <IoBookmarkOutline className="text-2xl" />,
    link: "/saved",
  },
];

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function Sidebar() {
  const pathName = usePathname();
  const [user, setUser] = useState<User | null>(null);

  async function handleLogout() {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again later.");
    }
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/users/current-user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="z-30 max-md:hidden fixed left-0 top-0 h-screen w-[18rem] bg-white border-r shadow-lg flex flex-col dark:bg-dark-700 dark:border-dark-500">
      {/* Top Section - Navigation */}
      <div className="flex flex-col gap-4 p-4 flex-grow overflow-y-auto mt-20">
        {navBar.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-pink-400 hover:text-white hover:transition-colors  dark:hover:bg-dark-500 ${
              pathName === item.link
                ? "bg-pink-500 text-white dark:bg-dark-400"
                : "text-gray-700 dark:text-dark-200"
            }`}
          >
            {item.icon}
            <span className="font-inter">{item.title}</span>
          </Link>
        ))}
        <div className="ml-2" onClick={handleLogout}>
          <div className="flex items-center text-red-600 h-10">
            <div>
              <BiLogOut className="text-2xl" />
            </div>
            <div>
              <button className="ml-4 text-lg font-inter ">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t flex-shrink-0 dark:border-dark-400">
        <Link href="/profile">
          <div className="flex items-center w-full p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-transparent">
            <div className="flex items-center justify-center font-bold text-white rounded-full h-12 w-12 bg-pink-500">
              {user?.firstName?.[0] ?? ""}
              {user?.lastName?.[0] ?? ""}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-lg font-semibold dark:text-dark-50">
                {user?.firstName ?? "User"}
              </p>
              <p className="text-sm text-gray-500 truncate w-[10rem]">
                {user?.email ?? "No email available"}
              </p>
            </div>
            <IoIosArrowForward className="text-gray-500 text-xl" />
          </div>
        </Link>
      </div>
    </div>
  );
}
