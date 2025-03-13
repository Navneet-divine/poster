"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Sidebar from "@/components/UI/Sidebar";
import MainContent from "@/components/UI/MainContent";
import Footer from "@/components/UI/Footer";
import {
  Button,
  PasswordInput,
  TextInput,
  Skeleton,
  Loader,
} from "@mantine/core";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const oldPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
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
        console.log(userRes);
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
    console.log("re-render");
  }, [avatarUrl]);

  async function handleEditProfile(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const firstName = firstNameRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();

    if (firstName?.length! < 2) {
      setFormData((prevValue) => ({
        ...prevValue,
        firstName: "Name must be 2 characters long.",
      }));
      return;
    } else {
      setFormData((prevValue) => ({
        ...prevValue,
        firstName: "",
      }));
    }

    if (lastName?.length! < 2) {
      setFormData((prevValue) => ({
        ...prevValue,
        lastName: "Last name must be 2 characters long.",
      }));
      return;
    } else {
      setFormData((prevValue) => ({
        ...prevValue,
        lastName: "",
      }));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email!)) {
      setFormData((prevErr) => ({
        ...prevErr,
        email: "Invalid email format",
      }));
      return;
    }

    try {
      await axios.post("/api/users/edit-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async function handleResetPassword(event: React.FormEvent) {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current?.value.trim();
    const newPassword = newPasswordRef.current?.value.trim();
    const confirmPassword = confirmPasswordRef.current?.value.trim();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(oldPassword!)) {
      setFormData((prevErr) => ({
        ...prevErr,
        oldPassword:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      }));
      return;
    } else {
      setFormData((prevErr) => ({
        ...prevErr,
        oldPassword: "",
      }));
    }

    if (!passwordRegex.test(newPassword!)) {
      setFormData((prevErr) => ({
        ...prevErr,
        newPassword:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      }));
      return;
    } else {
      setFormData((prevErr) => ({
        ...prevErr,
        newPassword: "",
      }));
    }

    if (newPassword !== confirmPassword) {
      setFormData((prevErr) => ({
        ...prevErr,
        confirmPassword: "Passwords do not match",
      }));
      return;
    } else {
      setFormData((prevErr) => ({
        ...prevErr,
        confirmPassword: "",
      }));
    }

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      await axios.post("/api/users/reset-password", data);
    } catch (e: any) {
      alert(e.message);
    } finally {
      oldPasswordRef.current!.value = "";
      newPasswordRef.current!.value = "";
      confirmPasswordRef.current!.value = "";
    }
  }

  async function handleLogout() {
    try {
      await axios.get("/api/auth/logout");
      router.push("/");
    } catch (e: any) {
      console.log(e.message);
    }
  }

  function handleClickProfile() {
    inputFileRef.current?.click();
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setAvatar(selectedFile);

      const formData = new FormData();
      formData.append("avatar", selectedFile);
      setAvatarLoading(true);

      try {
        if (selectedFile.type === "image/svg+xml") {
          throw new Error("svg is not allowed");
        }
        const res = await axios.post("/api/users/profile-avatar", formData);
        console.log(res.data.user.avatar);
        setAvatarUrl(res.data.user.avatar);
      } catch (e: any) {
        alert(e.message);
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="w-full min-h-screen p-5 pb-[5rem] ">
          <div className="flex max-md:justify-center w-full md:mt-10  ">
            <div className="flex max-md:flex-col items-center">
              {loading ? (
                <Skeleton height={144} width={144} circle />
              ) : (
                <>
                  <input
                    type="file"
                    className="hidden"
                    ref={inputFileRef}
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png,.svg,.gif,.webp"
                  />

                  {user?.avatar ? (
                    <div
                      onClick={handleClickProfile}
                      className="flex items-center justify-center  rounded-full h-36 w-36 text-2xl text-white font-montserrat hover:cursor-pointer"
                    >
                      {avatarLoading ? (
                        <Loader type="bars" color="pink" />
                      ) : (
                        <Image
                          key={user.avatar}
                          src={user.avatar}
                          alt="Profile avatar"
                          className="rounded-full w-36 h-36 object-cover"
                          width={144}
                          height={144}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={handleClickProfile}
                      className="flex items-center justify-center bg-pink-500 rounded-full h-36 w-36 text-2xl text-white font-montserrat hover:cursor-pointer"
                    >
                      {user?.firstName?.[0].toUpperCase()}
                      {user?.lastName?.[0].toUpperCase()}
                    </div>
                  )}
                </>
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
          <div className="md:hidden flex justify-center  mb-14 mt-5">
            <Button
              color="red"
              size="md"
              onClick={handleLogout}
              className="font-raleway"
            >
              Logout
            </Button>
          </div>

          <div className="w-full mt-5  ">
            <div>
              <h1 className="text-2xl text-dark-100  md:text-3xl font-raleway mb-3">
                CHANGE PASSWORD
              </h1>
            </div>
            <div className="flex max-md:flex-col p-2 items-centershadow-lg border rounded-md shadow-lg  dark:border-dark-500">
              <form
                className="w-full flex flex-col"
                onSubmit={handleResetPassword}
              >
                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <PasswordInput
                      label="Old Password"
                      name="oldPassword"
                      ref={oldPasswordRef}
                      error={formData.oldPassword}
                      placeholder="Enter Old Password"
                      autoComplete="off"
                      className="w-full mt-3 dark:text-dark-100"
                      required
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
                    />
                  )}
                  {loading ? (
                    <Skeleton
                      height={40}
                      width="100%"
                      className="mt-3"
                      classNames={{ root: "dark:bg-dark-500" }}
                    />
                  ) : (
                    <PasswordInput
                      label="New Password"
                      name="newPassword"
                      ref={newPasswordRef}
                      error={formData.newPassword}
                      placeholder="Enter New Password"
                      autoComplete="off"
                      required
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
                      className="w-full mt-3 dark:text-dark-100"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <PasswordInput
                      label="Confirm Password"
                      name="confirmPassword"
                      ref={confirmPasswordRef}
                      error={formData.confirmPassword}
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      required
                      className="w-full mt-3 dark:text-dark-100"
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
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
                      type="submit"
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
              <h1 className="text-2xl text-dark-100  md:text-3xl font-raleway mb-3">
                CHANGE PROFILE DATA
              </h1>
            </div>
            <div className="flex max-md:flex-col border shadow-lg rounded-md p-2 dark:border-dark-500">
              <form
                className="w-full flex flex-col"
                onSubmit={handleEditProfile}
              >
                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <TextInput
                      label="First Name"
                      name="firstName"
                      ref={firstNameRef}
                      error={formData.firstName}
                      placeholder="Enter"
                      autoComplete="off"
                      required
                      value={userDetails.firstName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full mt-3 dark:text-dark-100"
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" className="mt-3" />
                  ) : (
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      ref={lastNameRef}
                      error={formData.lastName}
                      placeholder="Enter"
                      autoComplete="off"
                      required
                      value={userDetails.lastName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          lastName: e.target.value,
                        })
                      }
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
                      className="w-full mt-3 dark:text-dark-100"
                    />
                  )}
                  {loading ? (
                    <Skeleton height={40} width="100%" />
                  ) : (
                    <TextInput
                      label="Email"
                      name="email"
                      ref={emailRef}
                      error={formData.email}
                      placeholder="Enter"
                      autoComplete="off"
                      required
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                      className="w-full mt-3 dark:text-dark-100"
                      style={{ outline: "none" }}
                      styles={{
                        input: {
                          backgroundColor: theme === "dark" ? "#2d2d2d" : "",
                          color: theme === "dark" ? "white" : "",
                          border: theme === "dark" ? "none" : "",
                        },
                      }}
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
                      type="submit"
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
