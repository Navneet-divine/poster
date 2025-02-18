"use client";

import { useDisclosure } from "@mantine/hooks";
import LoginModal from "@/components/LoginModal";
import SignUpModal from "@/components/SignUpModal";
import axios from "axios";
import { Notification } from "@mantine/core";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AppHeroContent() {
  const [error, setError] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginError, setLoginError] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const logiEmailRef = useRef<HTMLInputElement | null>(null);
  const loginPasswordRef = useRef<HTMLInputElement | null>(null);

  const [notification, setNotification] = useState<{
    title: string;
    color: string;
    message: string;
  } | null>(null);
  const [loginOpened, { open: openLogin, close: closeLogin }] =
    useDisclosure(false);
  const [registerOpened, { open: openRegister, close: closeRegister }] =
    useDisclosure(false);

  const switchToLogin = () => {
    closeRegister();
    openLogin();
  };

  const switchToRegister = () => {
    closeLogin();
    openRegister();
  };

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const firstName = firstNameRef.current?.value.trim();
      const lastName = lastNameRef.current?.value.trim();
      const email = emailRef.current?.value.trim();
      const password = passwordRef.current?.value.trim();
      const confirmPassword = confirmPasswordRef.current?.value.trim();

      if (!firstName) {
        setError((prevErr) => ({
          ...prevErr,
          firstName: "First Name is required",
        }));
        return;
      } else if (firstName.length < 2) {
        setError((prevErr) => ({
          ...prevErr,
          firstName: "First Name must be long",
        }));
        return;
      } else {
        setError((prevErr) => ({
          ...prevErr,
          firstName: "",
        }));
      }

      if (!lastName) {
        setError((prevErr) => ({
          ...prevErr,
          lastName: "Last Name is required",
        }));
        return;
      } else if (lastName.length < 2) {
        setError((prevErr) => ({
          ...prevErr,
          lastName: "Last Name must have be long",
        }));
        return;
      } else {
        setError((prevErr) => ({
          ...prevErr,
          lastName: "",
        }));
      }

      if (!email) {
        setError((prevErr) => ({
          ...prevErr,
          email: "Email is required",
        }));
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError((prevErr) => ({
          ...prevErr,
          email: "Invalid email format",
        }));
        return;
      } else {
        setError((prevErr) => ({
          ...prevErr,
          email: "",
        }));
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!password) {
        setError((prevErr) => ({
          ...prevErr,
          password: "Password is required",
        }));
        return;
      } else if (!passwordRegex.test(password)) {
        setError((prevErr) => ({
          ...prevErr,
          password:
            "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
        }));
        return;
      } else {
        setError((prevErr) => ({
          ...prevErr,
          password: "",
        }));
      }

      if (!confirmPassword) {
        setError((prevErr) => ({
          ...prevErr,
          confirmPassword: "Confirm Password is required",
        }));
        return;
      } else if (confirmPassword !== password) {
        setError((prevErr) => ({
          ...prevErr,
          confirmPassword: "Passwords do not match",
        }));
        return;
      } else {
        setError((prevErr) => ({
          ...prevErr,
          confirmPassword: "",
        }));
      }

      const res = await axios.post("/api/auth/register", data);

      closeRegister();
      router.push("/dashboard");
    } catch (error: any) {
      setNotification({
        title: "Error",
        message: error.response?.data?.message || "Registration failed",
        color: "red",
      });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    console.log("hello");

    // Clear previous errors
    setLoginError({ email: "", password: "" });

    // Extract values from refs
    const email = logiEmailRef.current?.value.trim() || "";
    const password = loginPasswordRef.current?.value.trim() || "";

    // Validate Email
    if (!email) {
      setLoginError((prevErr) => ({ ...prevErr, email: "Email is required" }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoginError((prevErr) => ({
        ...prevErr,
        email: "Invalid email format",
      }));
      return;
    }

    // Validate Password
    if (!password) {
      setLoginError((prevErr) => ({
        ...prevErr,
        password: "Password is required",
      }));
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setLoginError((prevErr) => ({
        ...prevErr,
        password:
          "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
      }));
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      closeLogin();
      router.push("/dashboard");
    } catch (error: any) {
      setNotification({
        title: "Login Failed",
        message: error.response?.data?.message || "Invalid credentials",
        color: "red",
      });
      closeLogin();

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  }

  return (
    <>
      <div className="flex pl-3 md:pl-4 lg:pl-6 mt-20">
        <div>
          <div className="uppercase font-montserrat font-bold mt-10 md:mt-16 text-5xl sm:text-7xl lg:text-8xl xl:text-7xl">
            <h1 className="text-pink-500">Post Your Posts</h1>
            <h1 className="dark:text-dark-200">with</h1>
            <h1 className="dark:text-dark-200">Poster</h1>
          </div>

          <div className="mt-3 text-xl font-raleway text-gray-500">
            <p className="sm:text-2xl">BRINGING THE BEST OUT OF YOU.</p>
          </div>

          <div>
            <SignUpModal opened={registerOpened} close={closeRegister}>
              <form onSubmit={handleRegister}>
                <div className="flex max-sm:gap-8 justify-between">
                  <div>
                    <TextInput
                      label="First Name"
                      ref={firstNameRef}
                      error={error.firstName}
                      name="firstName"
                      placeholder="First Name"
                      className="mb-3 "
                      autoComplete="off"
                      description="First Name is required"
                      styles={{
                        label: { fontWeight: "bold" },
                      }}
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Last Name"
                      ref={lastNameRef}
                      error={error.lastName}
                      name="lastName"
                      placeholder="Last Name"
                      className="mb-3"
                      autoComplete="off"
                      description="Last Name is required"
                      styles={{
                        label: {
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </div>
                </div>
                <TextInput
                  label="Email"
                  name="email"
                  ref={emailRef}
                  error={error.email}
                  placeholder="example@example.com"
                  className="mb-3"
                  autoComplete="off"
                  description="Email is required"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  ref={passwordRef}
                  error={error.password}
                  placeholder="Password"
                  autoComplete="off"
                  description="Password must be at least 8 characters, contain uppercase, lowercase, a number, and a special character."
                  className="mb-3"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />
                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  ref={confirmPasswordRef}
                  error={error.confirmPassword}
                  description="Confirm Password is required"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  className="mb-3"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <div className="flex justify-between items-center">
                  <p
                    className="hover:underline cursor-pointer"
                    onClick={switchToLogin}
                  >
                    Have an account? Login
                  </p>
                  <Button type="submit" variant="filled" color="pink">
                    Register
                  </Button>
                </div>
              </form>
            </SignUpModal>

            <LoginModal opened={loginOpened} close={closeLogin}>
              <form onSubmit={handleLogin}>
                <TextInput
                  label="Email"
                  ref={logiEmailRef}
                  error={loginError.email}
                  name="email"
                  placeholder="example@example.com"
                  autoComplete="off"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />
                <PasswordInput
                  label="Password"
                  ref={loginPasswordRef}
                  error={loginError.password}
                  name="password"
                  description="Password must be at least 8 characters, contain uppercase, lowercase, a number, and a special character."
                  placeholder="Password"
                  className="mt-2"
                  autoComplete="off"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />
                <div className="flex justify-between items-center mt-3">
                  <p
                    className="hover:underline cursor-pointer"
                    onClick={switchToRegister}
                  >
                    Don't have an account? Register
                  </p>
                  <Button type="submit" variant="filled" color="pink" size="sm">
                    Login
                  </Button>
                </div>
              </form>
            </LoginModal>
          </div>

          {/* Buttons directly below the paragraph */}
          <div className="mt-6 flex gap-4 justify-start">
            <Button
              onClick={openRegister}
              variant="filled"
              color="pink"
              size="md"
            >
              Register
            </Button>

            <Button
              onClick={openLogin}
              variant="outline"
              color="pink"
              size="md"
            >
              Login
            </Button>
          </div>
        </div>

        <div className="ml-auto max-xl:hidden w-[40%]">
          <img
            className="mt-8"
            src="/imgs/posterImg.svg"
            alt="Poster Illustration"
          />
        </div>
      </div>
      {notification && (
        <Notification
          color={notification.color}
          radius="md"
          title={notification.title}
          onClose={() => setNotification(null)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            width: "auto",
            maxWidth: "500px",
          }}
        >
          {notification.message}
        </Notification>
      )}
    </>
  );
}
