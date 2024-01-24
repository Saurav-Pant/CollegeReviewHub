"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; 
import Link from "next/link";
import BackButton from "@/components/BackButton";
import Images from "@/components/Images";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("/api/Users/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
  
      setLoading(false);
      router.push("/Login");
    } catch (error) {
      console.error("Error during signup:", error);
      setLoading(false);
    }
  };
  

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row justify-center items-center h-[90vh] relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="lg:w-1/2 px-4 mb-8">
        <BackButton link="/" />
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Sign Up
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center">
              {!loading ? (
                <motion.button
                  className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out"
                  onClick={handleSignUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Already have an account
              <Link
                href="/Login"
                className="text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out pl-2"
              >
                Login
              </Link>
            </p>
          </div>
          {/* <div className="text-center mt-10">
            <Link href="/sign-in">
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Sign In with Google
              </button>
            </Link>
          </div> */}
        </div>
      </div>

      <Images />
    </motion.div>
  );
};

export default SignUp;
