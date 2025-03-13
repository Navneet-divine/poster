import type { Metadata } from "next";
import Saved from "./Saved";

export const metadata: Metadata = {
  title: "Poster | Saved",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function SavedPage() {
  return <Saved />;
}
