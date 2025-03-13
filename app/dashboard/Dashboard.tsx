"use client";

import axios from "axios";
import Header from "@/components/Header";
import Sidebar from "@/components/UI/Sidebar";
import MainContent from "@/components/UI/MainContent";
import Footer from "@/components/UI/Footer";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { MdEditSquare } from "react-icons/md";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { Skeleton } from "@mantine/core";
import Head from "next/head";

interface Post {
  caption: string;
  location: string;
  image: string;
  _id: string;
  likes: number;
  isLiked: boolean;
  isBooked: boolean;
  createdAt: string;
  likedBy: string[];
  bookedBy: string[];
  author: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("/api/posts/all-posts");
        setTimeout(() => {
          setPosts(res.data.posts);
          setLoading(false);
        }, 1000);
      } catch (e: any) {
        console.log(e.message);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/users/current-user");
        setCurrentUserId(res.data.user._id);
      } catch (e: any) {
        console.log(e.message);
      }
    }
    fetchUser();
  }, []);

  async function handleToggleLike(postId: string) {
    if (!currentUserId) return;

    const postIndex = posts.findIndex((post) => post._id === postId);
    if (postIndex === -1) return;

    const updatedPosts = [...posts];
    const post = updatedPosts[postIndex];

    const newIsLiked = !post.likedBy.includes(currentUserId);
    const newLikesCount = newIsLiked ? post.likes + 1 : post.likes - 1;

    updatedPosts[postIndex] = {
      ...post,
      likes: newLikesCount,
      likedBy: newIsLiked
        ? [...post.likedBy, currentUserId]
        : post.likedBy.filter((id: any) => id.toString() !== currentUserId),
    };

    setPosts(updatedPosts);

    try {
      await axios.post(`/api/posts/toggle-like/${postId}`);
    } catch (e: any) {
      alert(e.message);

      updatedPosts[postIndex] = post;
      setPosts(updatedPosts);
    }
  }

  async function handleBookMark(postId: string) {
    if (!currentUserId) return;

    const postIndex = posts.findIndex((post) => post._id === postId);
    if (postIndex === -1) return;

    const updatedPosts = [...posts];
    const post = updatedPosts[postIndex];

    const newIsBooked = !post.bookedBy.includes(currentUserId);

    // Optimistically update the UI
    updatedPosts[postIndex] = {
      ...post,
      isBooked: newIsBooked,
      bookedBy: newIsBooked
        ? [...post.bookedBy, currentUserId]
        : post.bookedBy.filter((id: any) => id.toString() !== currentUserId),
    };

    setPosts(updatedPosts);

    try {
      await axios.post(`/api/posts/book-mark/${postId}`);
    } catch (e: any) {
      alert(e.message);

      updatedPosts[postIndex] = {
        ...post,
        isBooked: !newIsBooked,
        bookedBy: post.bookedBy,
      };
      setPosts(updatedPosts);
    }
  }

  return (
    <>
      <Head>
        <title>Poster | Dashboard</title>
        <meta
          name="description"
          content="Your dashboard for posts and updates"
        />
      </Head>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="flex flex-col items-center p-3 pb-14">
          <div className="flex items-center w-full md:w-[30rem] lg:w-[45rem] mt-3">
            <FaHome className="text-4xl dark:text-white" />
            <h1 className="text-3xl font-bold font-inter ml-2 dark:text-white ">
              Home Feed
            </h1>
          </div>

          {loading ? (
            <div className="flex flex-col items-center w-full md:w-[30rem] lg:w-[45rem]">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border border-dark-50 rounded-3xl mt-5 sm:mt-8 mb-7 p-5 w-full md:w-[30rem] lg:w-[45rem] lg:h-[45rem] dark:border-dark-400 dark:border-dark-500"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton circle height={56} width={56} />
                    <div className="w-full">
                      <Skeleton height={12} width="40%" radius="sm" mb={4} />
                      <Skeleton height={10} width="60%" radius="sm" />
                    </div>
                  </div>

                  <Skeleton height={320} width="100%" radius="xl" mt={5} />

                  <Skeleton height={12} width="70%" radius="sm" mt={10} />
                  <Skeleton height={12} width="50%" radius="sm" mt={2} />

                  <div className="flex justify-between mt-10">
                    <div className="flex items-center">
                      <Skeleton circle height={24} width={24} />
                      <Skeleton height={10} width={30} radius="sm" ml={8} />
                      <Skeleton circle height={24} width={24} ml={20} />
                    </div>
                    <Skeleton circle height={24} width={24} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="border border-dark-50 rounded-3xl mt-5 sm:mt-8 mb-7 p-5 w-full md:w-[30rem] lg:w-[45rem] lg:h-[45rem] dark:border-dark-400 dark:border-dark-500"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-16 md:w-[60px] rounded-full bg-pink-500 flex items-center justify-center overflow-hidden">
                      <h1 className="font-inter text-white text-xl">
                        {post.author.firstName
                          ? post.author.firstName[0].toUpperCase()
                          : "?"}
                        {post.author.lastName
                          ? post.author.lastName[0].toUpperCase()
                          : "?"}
                      </h1>
                    </div>
                    <div className="flex items-center w-full">
                      <div className="w-full">
                        <h1 className="font-bold dark:text-white">
                          {post.author.firstName}
                        </h1>
                        <p className="font-inter text-xs text-gray-500">
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}{" "}
                          - {post.location}
                        </p>
                      </div>
                      <Link href={`/post-detail/${post._id}`}>
                        <MdEditSquare className="text-xl text-dark-400 dark:text-dark-100" />
                      </Link>
                    </div>
                  </div>

                  <Link href={`/post-detail/${post._id}`}>
                    <div className="mt-5 h-[20rem] lg:h-[30rem] rounded-3xl cursor-pointer">
                      <img
                        src={post.image}
                        alt="post img"
                        className="object-cover h-full w-full rounded-3xl lg:w-full"
                      />
                    </div>
                  </Link>

                  <div className="mt-5">
                    <p className="font-inter font-semibold text-sm dark:text-white">
                      {post.caption}
                    </p>
                  </div>

                  <div className="flex justify-between mt-10">
                    <div className="flex items-center">
                      <button onClick={() => handleToggleLike(post._id)}>
                        {post.likedBy.includes(currentUserId!) ? (
                          <FaHeart className="text-2xl text-red-500" />
                        ) : (
                          <FaRegHeart className="text-2xl text-dark-200" />
                        )}
                      </button>
                      <p className="text-lg font-inter dark:text-dark-200 ml-1">
                        {post.likes}
                      </p>
                      <Link href={`/post-detail/${post._id}`} className="ml-5">
                        <FaRegComment className="text-xl dark:text-dark-200" />
                      </Link>
                    </div>
                    <button onClick={() => handleBookMark(post._id)}>
                      {post.bookedBy.includes(currentUserId!) ? (
                        <PiBookmarkSimpleFill className="text-2xl dark:text-dark-200" />
                      ) : (
                        <PiBookmarkSimpleLight className="text-2xl dark:text-dark-200" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </MainContent>
      <Footer />
    </>
  );
}
