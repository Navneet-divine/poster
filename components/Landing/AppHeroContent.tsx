"use client";

import { useDisclosure } from "@mantine/hooks";
import LoginModal from "@/components/LoginModal";
import SignUpModal from "@/components/SignUpModal";

import { Button, TextInput, PasswordInput } from "@mantine/core";

export default function AppMainContent() {
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

  return (
    <>
      <div className="flex pl-3 md:pl-4 lg:pl-6">
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
              <form>
                <div className="flex max-sm:gap-8 justify-between">
                  <div>
                    <TextInput
                      label="First Name"
                      placeholder="First Name"
                      className="mb-3"
                      description="First Name is required"
                      styles={{
                        label: {
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Last Name"
                      placeholder="Last Name"
                      className="mb-3"
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
                  placeholder="example@example.com"
                  className="mb-3"
                  description="Email is required"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  description="Password is required"
                  placeholder="Password"
                  className="mb-3"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />
                <PasswordInput
                  label="Confirm Password"
                  description="Confirm Password is required"
                  placeholder="Confirm Password"
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
                  <Button variant="filled" color="pink">
                    Register
                  </Button>
                </div>
              </form>
            </SignUpModal>

            <LoginModal opened={loginOpened} close={closeLogin}>
              <form>
                <TextInput
                  label="Email"
                  placeholder="example@example.com"
                  styles={{
                    label: {
                      fontWeight: "bold",
                    },
                  }}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  className="mt-2"
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
                  <Button variant="filled" color="pink" size="sm">
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
    </>
  );
}
