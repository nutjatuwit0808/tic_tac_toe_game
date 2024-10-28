"use client"
import GameHeader from "@/components/game-header";
import React from "react";

type Props = {
  children: any;
};

export default function GameLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      <GameHeader/>
      <div>{children}</div>
    </div>
  );
}
