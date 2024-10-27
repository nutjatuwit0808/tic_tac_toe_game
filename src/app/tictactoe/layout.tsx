"use client"
import GameHeader from "@/components/game-header";
import React from "react";

type Props = {
  children: any;
};

export default function GameLayout({ children }: Props) {
  return (
    <>
      <GameHeader/>
      <div>{children}</div>
    </>
  );
}
