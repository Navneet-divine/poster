"use client";

import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Show loader for 2 seconds
    return () => clearTimeout(timer); // Cleanup function
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader type="dots" color="pink" />
      </div>
    );
  }

  return <>{children}</>;
}
