"use client";
import SuccessNotification from "@/components/success-notification";
import { useErrorMsg } from "@/hooks/useErrorMsg";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {};

export default function RegisterPage({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
  const {errorMsg, setErrorMsg} = useErrorMsg();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const hasUserResp = await fetch("/api/hasUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { user } = await hasUserResp.json();
    if (user) {
      setErrorMsg("User already exist!");
      return;
    }

    const registerResp = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (registerResp.ok) {
      setIsRegisterSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setErrorMsg("Failed to registration!");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-700">
      {isRegisterSuccess && (
        <SuccessNotification message={"Your registration was successful."} />
      )}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-600  mb-6">
          {"Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border text-gray-600  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border text-gray-600  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {"Register"}
          </button>
          <h2 className="text-center font-bold text-red-500">{errorMsg}</h2>
        </form>
        <button
          onClick={router.back}
          className="w-full py-2 mt-4 text-sm font-semibold text-gray-600 hover:underline"
        >
          {"Back to Login"}
        </button>
      </div>
    </div>
  );
}
