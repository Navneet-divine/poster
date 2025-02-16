"use client";

import axios from "axios";
import Header from "@/components/Header"
import Sidebar from "@/components/UI/Sidebar";
import MainContent from "@/components/UI/MainContent";
import Footer from "@/components/UI/Footer";

export default function Dashboard() {
  async function logout() {
    await axios.get("/api/auth/logout");
  }

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <p>hello</p>
      </MainContent>
      <Footer />
    </>
  );
}
