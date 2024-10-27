"use client"
import React from "react";

type Props = {
  err: any;
};

export default function LoginError({ err }: Props) {
  return (
    <>
      <div>LoginError</div>
      <div>{err}</div>
    </>
  );
}
