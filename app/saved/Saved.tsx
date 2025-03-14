"use client";

import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import noDataImg from "@/public/imgs/no-data.webp";
import Link from "next/link";
import { Skeleton } from "@mantine/core";

// Define the Post type
interface Post {
  _id: string;
  caption: string;
  location: string;
  image: string;
  likes: number;
  isLiked: boolean;
  isBooked: boolean;
  createdAt: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Saved: React.FC = () => {
  const [bookedPosts, setBookedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookedPosts() {
      try {
        const res = await axios.get("/api/posts/render-bookedPost");
        setTimeout(() => {
          setBookedPosts(res.data.posts || []);
          setLoading(false);
        }, 1000);
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("An unknown error occurred.");
        }
        setLoading(false);
      }
    }

    fetchBookedPosts();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="flex flex-col sm:flex-row flex-wrap min-h-screen p-5 pt-0 pb-20">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full rounded-3xl  h-[20rem] border dark:border-dark-500 lg:w-[20rem] lg:mr-5"
              >
                <Skeleton height="100%" width="100%" radius="xl" />
              </div>
            ))
          ) : bookedPosts.length > 0 ? (
            bookedPosts.map((bookPost) => (
              <Link href={`/post-detail/${bookPost._id}`} key={bookPost._id}>
                <div className="w-full rounded-3xl mt-10 h-[20rem] border dark:border-dark-500 lg:w-[20rem] lg:mr-5 cursor-pointer relative">
                  <Image
                    src={bookPost.image}
                    alt="book post img"
                    className="object-cover w-full h-full rounded-3xl"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
            ))
          ) : (
            <>
              <div className="flex mt-5 border border-b-2 border-t-0 border-l-0 border-r-0 max-sm:h-28 md:pb-8">
                <h1 className="text-center xl:text-8xl lg:text-7xl sm:text-4xl text-3xl font-montserrat font-bold dark:text-dark-200">
                  SOME WONDERFUL POSTS YOU LIKED
                </h1>
              </div>

              <div className="flex justify-center w-full">
                <Image
                  src={noDataImg.src}
                  alt="no-data Img"
                  className="h-[15rem] sm:h-[20rem] md:h-[25rem]"
                  width={500}
                  height={500}
                />
              </div>
            </>
          )}
        </div>
      </MainContent>
      <Footer />
    </>
  );
};

export default Saved;
