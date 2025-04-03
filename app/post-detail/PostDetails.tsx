"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/UI/Sidebar";
import MainContent from "@/components/UI/MainContent";
import { useParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import axios from "axios";
import Footer from "@/components/UI/Footer";
import Link from "next/link";
import { Skeleton } from "@mantine/core";
import Image from "next/image";

interface Post {
  image: string;
  location: string;
  caption: string;
  createdAt: string;
  likes: number;
  _id: string;
  likedBy: string[];
  bookedBy: string[];
  author: {
    avatar: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
}

export default function PostDetail() {
  const router = useRouter();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Dynamically set API URL

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${apiUrl}/api/users/current-user`);
        setCurrentUserId(res.data.user._id);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    }
    fetchUser();
  }, [apiUrl]);

  useEffect(() => {
    if (!postId || Array.isArray(postId)) return;

    async function fetchPostDetails() {
      try {
        const res = await axios.get(
          `${apiUrl}/api/posts/post-details/${postId}`
        );
        setPost(res.data.post);
      } catch (e: unknown) {
        alert(e instanceof Error ? e.message : "An unknown error occurred.");
      }
    }

    fetchPostDetails();
  }, [postId, apiUrl]);

  async function handleToggleLike(postId: string) {
    if (!currentUserId || !post) return;

    const newIsLiked = !post.likedBy.includes(currentUserId);
    const newLikesCount = newIsLiked ? post.likes + 1 : post.likes - 1;

    const updatedPost = {
      ...post,
      likes: newLikesCount,
      likedBy: newIsLiked
        ? [...post.likedBy, currentUserId]
        : post.likedBy.filter((id: string) => id.toString() !== currentUserId),
    };

    setPost(updatedPost);

    try {
      await axios.post(`${apiUrl}/api/posts/toggle-like/${postId}`);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "An unknown error occurred.");
      setPost(post); // Revert to previous state on error
    }
  }

  async function handleBookMark(postId: string) {
    if (!currentUserId || !post) return;

    const newIsBooked = !post.bookedBy.includes(currentUserId);

    const updatedPost = {
      ...post,
      bookedBy: newIsBooked
        ? [...post.bookedBy, currentUserId]
        : post.bookedBy.filter((id: string) => id.toString() !== currentUserId),
    };

    setPost(updatedPost);

    try {
      await axios.post(`${apiUrl}/api/posts/book-mark/${postId}`);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "An unknown error occurred.");
      setPost(post); // Revert to previous state on error
    }
  }

  async function handleDeletePost(postId: string) {
    try {
      await axios.post(`${apiUrl}/api/posts/delete-post/${postId}`);
      router.push("/dashboard");
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="p-5">
          <div className="border w-full h-full rounded-3xl p-4 dark:border-dark-500">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                {post ? (
                  <Image
                    src={post.image}
                    alt="postImg"
                    className="rounded-3xl object-cover h-[20rem] w-full"
                    width={500}
                    height={500}
                  />
                ) : (
                  <Skeleton height={300} radius="xl" />
                )}
              </div>

              <div className="lg:ml-5 flex-none lg:w-1/2">
                <div className="flex justify-between items-center mt-5 border border-t-0 border-l-0 border-r-0 pb-5 dark:border-dark-500">
                  <div className="flex items-center">
                    {post ? (
                      post.author.avatar ? (
                        <div className="rounded-full h-12 w-12 bg-pink">
                          <Image
                            src={post.author.avatar}
                            alt="authorAvatar"
                            className="rounded-3xl object-cover h-12 w-12"
                            width={48}
                            height={48}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center rounded-full h-12 w-12 bg-pink-500 text-white font-inter">
                          {post.author.firstName[0]}
                          {post.author.lastName[0]}
                        </div>
                      )
                    ) : (
                      <Skeleton circle height={48} width={48} />
                    )}

                    <div className="ml-2">
                      <div>
                        <h1 className="dark:text-white">
                          {post ? (
                            post.author.firstName
                          ) : (
                            <Skeleton width={80} />
                          )}
                        </h1>
                      </div>
                      <div>
                        <p className="font-inter text-xs text-gray-500">
                          {post ? (
                            formatDistanceToNow(new Date(post.createdAt), {
                              addSuffix: true,
                            })
                          ) : (
                            <Skeleton width={120} />
                          )}
                          - {post?.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Edit and Delete Icons */}
                  <div className="flex">
                    {post?.author._id === currentUserId && (
                      <Link href={`/edit-post/${postId}`}>
                        <div className="cursor-pointer">
                          <MdEditSquare className="text-xl dark:text-dark-100" />
                        </div>
                      </Link>
                    )}

                    {post?.author._id === currentUserId && (
                      <div
                        onClick={() => handleDeletePost(postId as string)}
                        className="cursor-pointer"
                      >
                        <MdDelete className="text-xl ml-2 dark:text-dark-100" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-inter text-sm dark:text-white">
                    {post ? post.caption : <Skeleton height={40} />}
                  </p>
                </div>

                <div className="flex justify-between mt-5 lg:mt-32">
                  <div className="flex items-center">
                    <button onClick={() => handleToggleLike(postId as string)}>
                      {post?.likedBy.includes(currentUserId!) ? (
                        <FaHeart className="text-2xl text-red-500" />
                      ) : (
                        <FaRegHeart className="text-2xl text-dark-200" />
                      )}
                    </button>
                    <p className="text-lg font-inter dark:text-dark-200 ml-1">
                      {post ? post.likes : <Skeleton width={40} />}
                    </p>
                    {/* <FaRegComment className="text-xl dark:text-dark-200 ml-5" /> */}
                  </div>
                  <button onClick={() => handleBookMark(postId as string)}>
                    {post?.bookedBy.includes(currentUserId!) ? (
                      <PiBookmarkSimpleFill className="text-2xl dark:text-dark-200" />
                    ) : (
                      <PiBookmarkSimpleLight className="text-2xl dark:text-dark-200" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContent>
      <Footer />
    </>
  );
}
