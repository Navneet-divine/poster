import type { Metadata } from "next";
import People from "./People";

export const metadata: Metadata = {
  title: "Poster | People",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function PeoplePage() {
  return <People />;
}
