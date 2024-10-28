"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {};

export default function GameHeader({}: Props) {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center backdrop-blur-md">
      <h1 className="text-white text-2xl font-bold">Tic Tac Toe</h1>

      <div className="relative flex gap-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-300 text-black font-bold px-4 py-2 rounded-lg focus:outline-none">
          {session?.user?.email ?? "Use Login"}
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-black font-bold px-4 py-2 rounded-lg focus:outline-none"
        >
          {"Logout"}
        </button>
      </div>
    </nav>
  );
}
