"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import BackButton from "@/components/BackButton";
import Images from "@/components/Images";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); 

  const router = useRouter();

  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/api/users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          router.push("/Review");
        } else {
          setLoading(false); 
        }
      })
      .catch((error) => {
        setLoading(false); 
        console.error("Error during login:", error);
      });
  };

  // Define animations
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
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
        <motion.div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
          <h1 className="text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Login
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
            <div className="flex items-center justify-between">
              {!loading ? (
                <motion.button
                  className="bg-slate-950 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  type="button"
                  onClick={handleLogIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Don't have an account?
              <Link
                href="/Signup"
                className="text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out pl-2"
              >
                SignUp
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Images />
    </motion.div>
  );
};

export default Login;
