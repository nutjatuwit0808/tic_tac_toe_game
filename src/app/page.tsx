"use client";
import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-700 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Welcome to Tic-Tac-Toe Online
      </h1>

      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
        Play the classic game of Tic-Tac-Toe against the computer or with a
        friend. The rules are simple: place three of your marks in a row
        horizontally, vertically, or diagonally to win!
      </p>

      <h2 className="text-2xl font-semibold mb-4">Game Rules</h2>
      <ul className="text-base md:text-lg list-disc list-inside mb-8 text-center max-w-lg">
        <li>The game is played on a 3x3 grid.</li>
        <li>Players take turns marking a cell with "X" or "O".</li>
        <li>The first player to align three marks in a row wins.</li>
        <li>If all cells are filled with no winner, it's a tie.</li>
      </ul>

      <Link
        href="/login"
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-yellow-500 transition duration-300"
      >
        Login to Play
      </Link>
    </div>
  );
}
