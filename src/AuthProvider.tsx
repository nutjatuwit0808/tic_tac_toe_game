"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionType = {
  children: ReactNode;
  session?: any;
};

export const AuthProvider = ({ children, session }: SessionType) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};