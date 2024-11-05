"use client"
import React, { useEffect, useState } from "react";

type Props = {};

export default function LoggingOutScreen({}: Props) {
  const [loadingText, setLoadingText] = useState<string>("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) =>
        prev === "Loading..." ? "Loading" : prev + "."
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-700 w-full h-screen flex justify-center items-center font-bold text-2xl text-white">
      {loadingText}
    </div>
  );
}
