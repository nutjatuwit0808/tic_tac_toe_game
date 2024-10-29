"use client";
import LoggingOutScreen from "@/components/logging-out-screen";
import { X, O, winPatterns } from "@/constants/game.constant";
import { useErrorMsg } from "@/hooks/useErrorMsg";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import React, { useState, useEffect } from "react";

export default function TictactoeGame() {
  const { session, isLoading } = useRequireAuth();
  const {errorMsg, setErrorMsg} = useErrorMsg();

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [score, setScore] = useState<number | undefined>();
  const [winStreak, setWinStreak] = useState<number | undefined>();
  
  const handleClick = (index: number) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? X : O;
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);
  };

  const checkWinner = (board: Array<string | null>): string | null => {
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
      newBoard[randomMove] = O;
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !checkWinner(board)) {
      const timer = setTimeout(() => botMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board]);

  useEffect(() => {
    if (session?.user?.email) fetchGetUserScore();
  }, [session?.user?.email]);

  const winner = checkWinner(board);

  useEffect(() => {
    if (winner === X) {
      fetchUpdateUserScore(true);
    } else if (winner === O) {
      fetchUpdateUserScore(false);
    } else {
      setBoard(Array(9).fill(null));
      setIsPlayerTurn(true);
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

      fetchGetUserScore();
    }
  };

  const fetchGetUserScore = async () => {
    // Check if email exists in session
    const email = session?.user?.email;
    if (!email) {
      setErrorMsg("No email in session")
      return;
    }

    const userScoreResp = await fetch(
      `/api/getUserScore?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (userScoreResp.ok) {
      const userScoreData = await userScoreResp.json();

      let score = userScoreData?.userScore?.score ?? undefined;
      let winStreak = userScoreData?.userScore?.winning_streak ?? undefined;

      setScore(score);
      setWinStreak(winStreak);
    } else {
      setErrorMsg("Get score failed");
    }
  };

  if (isLoading) return <LoggingOutScreen />;

  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-700">
      <div className="w-full flex justify-end gap-4 text-white font-bold p-12">
        {score && (
          <div className="bg-green-500 p-2 rounded-md opacity-90">
            <h2>Score {score}</h2>
          </div>
        )}
        {winStreak && (
          <h2 className="bg-orange-500 p-2 rounded-md">
            Winning Streak {winStreak}
          </h2>
        )}
      </div>
      <div className="flex flex-col items-center h-screen mt-12">
        <div className="grid grid-cols-3 gap-4 w-128">
          {board.map((value, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`square w-24 h-24 flex items-center justify-center bg-white border border-gray-300 text-4xl rounded-md font-bold hover:bg-blue-100 ${
                value === O ? "text-blue-600" : "text-red-600"
              } `}
            >
              {value}
            </button>
          ))}
        </div>
        <h2 className="text-center font-bold text-red-500">{errorMsg}</h2>
        <div className="mt-6 text-2xl font-bold">
          {winner ? (
            <h2 className="text-green-500 font-semibold">{winner} wins!</h2>
          ) : isPlayerTurn ? (
            <h2 className="text-white">Your turn</h2>
          ) : (
            <h2 className="text-white">Bot's turn</h2>
          )}
        </div>
      </div>
    </div>
  );
}
