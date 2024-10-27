"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent, MouseEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("test123@email.com");
  const [password, setPassword] = useState<string>("password");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //Login
    const loginResp = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (loginResp?.error) {
      alert("Invalid credentials");
      return;
    } else {
      router.push("/tictactoe");
    }
  };

  const handleClickRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/register");
  };

  //   function setAuthToken(token: string) {
  //     Cookies.set("token", token, {
  //       path: "/",
  //       expires: 7, // Expires in 7 days
  //     });
  //   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-700">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{"Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {"Login"}
          </button>
        </form>
        <button
          onClick={handleClickRegister}
          className="w-full py-2 mt-4 text-sm font-semibold text-gray-600 hover:underline"
        >
          Don’t have an account? Register
        </button>
      </div>
    </div>
  );
}
