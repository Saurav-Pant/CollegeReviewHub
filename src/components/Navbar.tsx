"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

type Props = {};

const Navbar = (props: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await axios.get("/api/Users/Logout");
      localStorage.removeItem("token");
      setTimeout(() => {
        setLoading(false);
        router.push("/Login");
        router.refresh();
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
          <Link href="/" className="sm:text-2xl font-bold text-xl">
            ReviewHub
          </Link>
        </motion.div>

        <ul className="flex space-x-2 sm:text-lg sm:font-bold font-semibold justify-center items-center">
          {(token || userId) && (
              <>
                <motion.li
                  className="sm:mr-8 mr-3"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/Dashboard"
                    className="transition duration-300 ease-in-out hover:text-gray-700 sm:pr-8 pr-2"
                  >
                    Dashboard
                  </Link>
                </motion.li>
                {token ? (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-8"
                  >
                    {!loading ? (
                      <button
                        className="bg-slate-950 hover:bg-slate-700 text-white font-bold sm:py-2 sm:px-3 px-1 py-1 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    ) : (
                      <LoadingSpinner />
                    )}
                  </motion.li>
                ) : null}
                {userId ? (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-8"
                  >
                    <div className="">
                      {userId ? <UserButton afterSignOutUrl="/" /> : null}
                    </div>
                  </motion.li>
                ) : null}
              </>
            )}
        </ul>
      </nav>
      <hr className="w-full my-2 border-gray-300" />
    </motion.div>
  );
};

export default Navbar;
