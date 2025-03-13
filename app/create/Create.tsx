"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";
import { LuImagePlus } from "react-icons/lu";
import { Textarea, TextInput, Button } from "@mantine/core";
import fileUploadImg from "@/public/icons/file-upload.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Create: React.FC = () => {
  const [errors, setErrors] = useState({
    caption: "",
    location: "",
    image: "",
  });
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    image: null as File | null,
    preview: "",
  });

  function handleFileInput() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: previewUrl,
      }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("caption", formData.caption);
      fd.append("location", formData.location);
      if (formData.image) {
        fd.append("image", formData.image);
      }
      setLoader(true);

      if (!formData.caption) {
        setErrors((prev) => ({ ...prev, caption: "Caption is required" }));
        return;
      } else if (formData.caption.length < 5) {
        setErrors((prev) => ({
          ...prev,
          caption: "Caption must be at least 5 characters",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, caption: "" }));
      }

      if (!formData.image) {
        setErrors((prev) => ({ ...prev, image: "Image is required" }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, image: "" }));
      }

      if (!formData.location) {
        setErrors((prev) => ({ ...prev, location: "Location is required" }));
        return;
      } else if (formData.location.length < 2) {
        setErrors((prev) => ({
          ...prev,
          location: "Location must be at least 2 characters",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, location: "" }));
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create-post`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response:", res.data);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }

    console.log("Form Data:", {
      caption: formData.caption,
      location: formData.location,
      image: formData.image?.name || null,
    });
  }

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="min-h-screen xl:p-24 xl:pt-5 xl:pb-10 p-3 pb-20">
          <div className="flex items-center">
            <LuImagePlus className="text-5xl dark:text-white" />
            <h1 className="text-4xl font-inter font-bold ml-3 dark:text-white">
              Create Post
            </h1>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <Textarea
                label="Caption"
                resize="vertical"
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                classNames={{
                  input:
                    "h-32 border border-dark-50 rounded-md dark:bg-dark-700 dark:border-dark-500 dark:text-white font-inter",
                  label: "font-inter font-semibold dark:text-white",
                }}
              />
              {errors.caption && (
                <p className="text-red-500 text-sm font-inter">
                  {errors.caption}
                </p>
              )}

              <p className="font-inter font-semibold text-sm dark:text-white mt-6">
                Add Photos
              </p>
              <div
                onClick={handleFileInput}
                className="border border-dark-50 h-[30rem] rounded-md dark:border-dark-500 cursor-pointer"
              >
                <input
                  type="file"
                  name="image"
                  ref={inputFileRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col justify-center items-center h-full">
                  {formData.preview ? (
                    <Image
                      src={formData.preview}
                      alt="Preview"
                      className="max-w-full rounded-md w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <>
                      <Image
                        src={fileUploadImg.src}
                        alt="file-upload"
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className="bg-pink-500 mt-3 h-10 rounded-md px-5 py-3 flex items-center text-white font-inter dark:bg-dark-500"
                      >
                        Select from computer
                      </button>
                    </>
                  )}
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm font-inter">
                  {errors.image}
                </p>
              )}

              <TextInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-5"
                classNames={{
                  input:
                    "h-12 rounded-md border border-dark-50 dark:bg-dark-400 dark:bg-dark-700 dark:border-dark-500 dark:text-white",
                  label: "font-inter font-semibold dark:text-white",
                }}
              />
              {errors.location && (
                <p className="text-red-500 text-sm font-inter">
                  {errors.location}
                </p>
              )}

              <div className="mt-6 flex justify-end items-center">
                <Link href=".">
                  <Button
                    variant="filled"
                    className="mr-3"
                    classNames={{
                      root: "bg-dark-400 h-10 rounded-md hover:bg-dark-400",
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="filled"
                  className="mr-3"
                  color="pink"
                  type="submit"
                >
                  {loader ? "Creating..." : "Create Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </MainContent>
      <Footer />
    </>
  );
};

export default Create;
