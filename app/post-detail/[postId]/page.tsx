import type { Metadata } from "next";
import PostDetail from "../PostDetails";

export const metadata: Metadata = {
  title: "Poster | Detail",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function PeoplePage() {
  return <PostDetail />;
}
