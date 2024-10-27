"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import React, { useState, useEffect } from "react";

export default function TictactoeGame() {
  const { session, isLoading } = useRequireAuth();

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [score, setScore] = useState<number | undefined>();
  const [winStreak, setWinStreak] = useState<number | undefined>();

  const handleClick = (index: number) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? "X" : "O";
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);
  };

  const checkWinner = (board: Array<string | null>): string | null => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const botMove = () => {
    const emptySquares = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
    const randomMove =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    if (randomMove !== undefined) {
      const newBoard = [...board];
      newBoard[randomMove] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    console.log("board => ", board);
    if (!isPlayerTurn && !checkWinner(board)) {
      const timer = setTimeout(() => botMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board]);

  useEffect(() => {
    console.log("use login => ", session);
    if (session?.user?.email) fetchGetUserScore();
  }, [session?.user?.email]);

  const winner = checkWinner(board);

  useEffect(() => {
    console.log("winner => ", winner);
    if (winner === "X") {
      fetchUpdateUserScore(true);
    } else if (winner === "O") {
      fetchUpdateUserScore(false);
    }
  }, [winner]);

  const fetchUpdateUserScore = async (isWin: boolean) => {
    let url = isWin ? "/api/addUserScore" : "/api/reduceUserScore";

    let userScoreResp;
    if (isWin) {
      userScoreResp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
    } else {
      userScoreResp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
    }

    if (userScoreResp.ok) {
      //clear all game
      setBoard(Array(9).fill(null));
      setIsPlayerTurn(true);
      console.log("Add score success");

      fetchGetUserScore()
    } else {
      console.log("Add score failed");
    }
  };

  const fetchGetUserScore = async () => {
    // Check if email exists in session
    const email = session?.user?.email;
    if (!email) {
      console.log("No email in session");
      return;
    }

    // Fetch request with email as a query parameter
    const userScoreResp = await fetch(
      `/api/getUserScore?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("fetchGetUserScore userScoreResp => ", userScoreResp);

    if (userScoreResp.ok) {
      const userScoreData = await userScoreResp.json(); // Parse the JSON data
      console.log("Get score success", userScoreData);

      let score = userScoreData?.userScore?.score ?? undefined;
      let winStreak = userScoreData?.userScore?.winning_streak ?? undefined;

      setScore(score);
      setWinStreak(winStreak);

    } else {
      console.log("Get score failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full flex justify-end gap-4 text-gray-600 font-bold">
        <h2>Score {score}</h2>
        <h2>Winning Streak {winStreak}</h2>
      </div>
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Tic Tac Toe</h1>

      <div className="grid grid-cols-3 gap-4 w-64">
        {board.map((value, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="square w-20 h-20 flex items-center justify-center bg-white border border-gray-300 text-2xl font-bold hover:bg-blue-100 text-blue-400"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xl">
        {winner ? (
          <h2 className="text-green-500 font-semibold">{winner} wins!</h2>
        ) : isPlayerTurn ? (
          <h2 className="text-blue-500">Your turn</h2>
        ) : (
          <h2 className="text-red-500">Bot's turn</h2>
        )}
      </div>
    </div>
  );
}
