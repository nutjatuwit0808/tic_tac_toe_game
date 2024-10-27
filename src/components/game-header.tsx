"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  session?: any;
};

export default function GameHeader({}: Props) {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Tic Tac Toe</h1>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg focus:outline-none"
        >
          {session?.user?.email ?? "Use Login"}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              View Profile
            </Link>
            <Link
              onClick={() => signOut()}
              href=""
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
