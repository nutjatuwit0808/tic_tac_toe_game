"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("useRequireAuth => ", session, status)
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, isLoading: status === "loading" };
}