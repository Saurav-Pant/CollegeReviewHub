"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

type Props = {};

const Navbar = (props: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/Logout");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");

      setTimeout(() => {
        setLoading(false);
        router.push("/Login");
      }, 1500);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <nav className="flex items-center justify-between px-8 py-4">
        <motion.div
          className="flex items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="text-2xl font-bold">
            ReviewHub
          </Link>
        </motion.div>

        <ul className="flex space-x-4 text-lg font-bold justify-center items-center">
          {token && (
            <>
              <motion.li
                className="mr-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/Reviews"
                  className="transition duration-300 ease-in-out hover:text-gray-700"
                >
                  Reviews
                </Link>
              </motion.li>
              <motion.li
                className=""
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/Dashboard"
                  className="transition duration-300 ease-in-out hover:text-gray-700 pr-8"
                >
                  Dashboard
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-8"
              >
                {!loading ? (
                  <button
                    className="bg-slate-950 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                ) : (
                  <LoadingSpinner />
                )}
              </motion.li>
            </>
          )}
        </ul>
      </nav>
      <hr className="w-full my-2 border-gray-300" />
    </motion.div>
  );
};

export default Navbar;
