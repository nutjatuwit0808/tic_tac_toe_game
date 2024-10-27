import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from "bcryptjs";
import { signOut } from "next-auth/react";

type Props = {}

const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any, req: any) {
          const { email, password } = credentials;
          try {
            await connectMongoDB();
            const user = await User.findOne({ email });
  
            if (!user) {
              return null;
            }
  
            const passwordMatch = await bcrypt.compare(password, user.password);
  
            if (!passwordMatch) {
              return null;
            }
            return user;
          } catch (error) {
            console.log(error);
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //   signIn: "/login",
    //   signOut: "/logout"
    // },
  };
  
  const handler = NextAuth(authOptions as AuthOptions);
  export { handler as GET, handler as POST };