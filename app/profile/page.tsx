"use client";

import Header from "@/components/Header";
import Footer from "@/components/UI/Footer";
import MainContent from "@/components/UI/MainContent";
import Sidebar from "@/components/UI/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/users/current-user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>
        <div className="border border-red-400 h-full p-2 pt-5">
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex justify-center items-center h-10 w-10 bg-orange-400 rounded-full">
                h
              </div>
              <div className="ml-3">
                <div>
                  <p className="text-lg">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm">navneetkush0102@gmail.com</p>
                </div>
              </div>
            </div>
            <div>
              <button>Edit profile</button>
            </div>
          </div>
        </div>
      </MainContent>

      <Footer />
    </>
  );
};

export default Profile;
