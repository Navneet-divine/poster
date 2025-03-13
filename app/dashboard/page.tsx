import type { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Poster | Create",
  description: "post landing page",
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export default function CreatePage() {
  return <Dashboard />;
}
