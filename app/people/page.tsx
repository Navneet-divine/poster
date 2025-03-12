"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MdPeople } from "react-icons/md";
import { Skeleton } from "@mantine/core";
import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const People: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-red-500",
  ];

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  async function fetchUsers(page: number) {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/all-users?page=${page}&limit=6`);
      if (res.data?.users?.length > 0) {
        setUsers((prevUsers) => {
          const newUsers = res.data.users.filter(
            (newUser: User) =>
              !prevUsers.some((user) => user.email === newUser.email)
          );
          return [...prevUsers, ...newUsers];
        });
        console.log(res.data.hasMore);
        setHasMore(res.data.hasMore);
      } else {
        // If no users returned, set hasMore to false
        setHasMore(false);
      }
      setLoading(false);
    } catch (e: any) {
      console.error("Error fetching users:", e.message);
      alert("An error occurred while fetching users.");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="min-h-screen p-5 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center mt-5">
            <div className="flex items-center w-full lg:pl-16 mb-5 col-span-full">
              <MdPeople className="text-4xl dark:text-white" />
              <h1 className="text-3xl font-bold font-inter ml-2 dark:text-white">
                All Users
              </h1>
            </div>

            {loading && users.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col h-[20rem] w-full mb-4 p-4 border border-dark-50 rounded-3xl dark:border-dark-500"
                  >
                    <Skeleton circle height={80} width={80} />
                    <Skeleton height={20} width="60%" mt={10} />
                    <Skeleton height={20} width="40%" mt={10} />
                  </div>
                ))
              : users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col h-[20rem] w-full mb-4 p-4 border border-dark-50 rounded-3xl dark:border-dark-500"
                  >
                    <div
                      className={`flex items-center justify-center h-20 w-20 rounded-full ${
                        colors[index % colors.length]
                      }`}
                    >
                      <h2 className="text-2xl font-bold text-white">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </h2>
                    </div>

                    <p className="mt-5 font-montserrat text-lg dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="font-inter text-sm font-semibold mt-1 dark:text-white">
                      @{user.email}
                    </p>
                  </div>
                ))}
          </div>
          {hasMore && !loading && (
            <div className="flex justify-center mt-5">
              <button
                onClick={() => setPage((prevPage) => prevPage + 1)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </MainContent>
      <Footer />
    </>
  );
};

export default People;
