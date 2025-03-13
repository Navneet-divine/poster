import type { Metadata } from "next";
import Create from "./Create";

export const metadata: Metadata = {
  title: "Poster | Create",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function CreatePage() {
  return <Create />;
}
