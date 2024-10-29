"use client";
import { useEffect, useState } from "react";

export function useErrorMsg() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  //remove error message in 3s
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  }, [errorMsg]);

  return {errorMsg, setErrorMsg};
}
