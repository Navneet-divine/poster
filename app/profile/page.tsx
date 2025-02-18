"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import Header from "@/components/Header";
import Sidebar from "@/components/UI/Sidebar";
import MainContent from "@/components/UI/MainContent";
import Footer from "@/components/UI/Footer";
import { CgProfile } from "react-icons/cg";
import { Button, PasswordInput, TextInput, Skeleton } from "@mantine/core";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

interface Blog {
  _id: string;
  title: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await axios.get("/api/users/current-user");
        setUser(userRes.data.user);
        setUserDetails({
          firstName: userRes.data.user.firstName || "",
          lastName: userRes.data.user.lastName || "",
          email: userRes.data.user.email || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="w-full min-h-screen p-5 pb-[5rem] ">
          <div className="flex max-md:justify-center w-full md:mt-10 mb-16 ">
            <div className="flex max-md:flex-col items-center ">
              {loading ? (
                <Skeleton height={144} width={144} circle />
              ) : (
                <div className="flex items-center justify-center bg-pink-500 rounded-full h-36 w-36 text-2xl text-white font-montserrat hover:cursor-pointer">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
              )}
              <div className="max-md:flex max-md:flex-col max-md:items-center md:ml-4 mt-3 md:mt-0">
                {loading ? (
                  <Skeleton height={20} width={150} />
                ) : (
                  <h1 className="text-2xl font-inter font-semibold dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </h1>
                )}
                {loading ? (
                  <Skeleton height={15} width={200} className="mt-2" />
                ) : (
                  <p className="text-dark-300 text-sm font-inter font-medium dark:text-dark-100">
                    {user?.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-5  ">
            <div>
              <h1 className="text-2xl text-dark-300  md:text-3xl font-raleway mb-3">
                CHANGE PASSWORD
              </h1>
            </div>
            <div className="flex max-md:flex-col p-2 items-centershadow-lg border rounded-md shadow-lg ">
              <form className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <PasswordInput
                      label="Old Password"
                      name="oldPassword"
                      placeholder="Enter Old Password"
                      autoComplete="off"
                      className="w-full mt-3"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <PasswordInput
                      label="New Password"
                      name="newPassword"
                      placeholder="Enter New Password"
                      autoComplete="off"
                      className="w-full mt-3"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <PasswordInput
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      className="w-full mt-3"
                    />
                  )}
                </div>

                <div className="flex justify-end mt-4">
                  {loading ? (
                    <Skeleton height={40} width={150} />
                  ) : (
                    <Button
                      className="text-white px-4 py-2 rounded"
                      color="pink"
                    >
                      Change Password
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="w-full mt-5">
            <div>
              <h1 className="text-2xl text-dark-300  md:text-3xl font-raleway mb-3">
                CHANGE PROFILE DATA
              </h1>
            </div>
            <div className="flex max-md:flex-col border shadow-lg rounded-md p-2">
              <form className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <TextInput
                      label="First Name"
                      name="FirstName"
                      placeholder="Enter"
                      autoComplete="off"
                      value={userDetails.firstName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full mt-3"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter"
                      autoComplete="off"
                      value={userDetails.lastName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full mt-3"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <TextInput
                      label="Email"
                      name="email"
                      placeholder="Enter"
                      autoComplete="off"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                      className="w-full mt-3"
                    />
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  {loading ? (
                    <Skeleton height={40} width={150} />
                  ) : (
                    <Button
                      className="text-white px-4 py-2 rounded"
                      color="pink"
                    >
                      Change Details
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainContent>
      <Footer />
    </>
  );
};

export default Profile;
