import type { Metadata } from "next";
import EditPost from "./EditPost";

export const metadata: Metadata = {
  title: "Poster | Edit",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function CreatePage() {
  return <EditPost />;
}
