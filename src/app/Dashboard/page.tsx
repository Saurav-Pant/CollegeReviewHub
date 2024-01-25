"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import { useClerk } from "@clerk/clerk-react";
import Profile from "@/Assets/profile.png"
import DeleteButton from "@/components/DeleteBtn";
import Link from "next/link";


interface Review {
  id: number;
  collegeName: string;
  review: string;
  creator: string;
  creatorImgUrl: string;
  userId: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useClerk();

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token");
    console.log(token);
  }

  useEffect(() => {
    axios
      .get<{ reviews: Review[] }>("/api/Reviews")
      .then((response) => {
        setReviews(response.data.reviews);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredReviews =
    reviews
      ?.filter((review) =>
        review.userId === token || review.creator === user?.username
      )
      .filter((review) =>
        review.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen relative">
      {isLoading ? (
        <SplashScreen isLoading={isLoading} />
      ) : (
        <>
          <BackButton link="/" />
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for a college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>
          {filteredReviews.length === 0 ? (
            <motion.div
              className="flex justify-center items-center h-[50vh]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <p className="font-bold text-2xl">No Reviews Found</p>
            </motion.div>

          ) : (
            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 relative">
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md p-6 h-60 flex flex-col justify-center hover:shadow-xl transition-shadow duration-300 relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between">
                    <h4
                      className="absolute top-4 left-4 font-medium bg-gray-100 px-4 py-2 rounded shadow-md hover:shadow-xl  transition-shadow duration-300 ease-in-out"
                    >
                      {review.creator}
                    </h4>
                    {review.creatorImgUrl === "" ? (
                      <img
                        src={Profile.src}
                        alt="Creator"
                        className="h-12 w-12 rounded-full absolute top-4 right-4 hover:h-14 hover:w-14 transition-all duration-300 ease-in-out delay-75"
                      />
                    ) : (
                      <img
                        src={review.creatorImgUrl}
                        alt="Creator"
                        className="h-12 w-12 rounded-full absolute top-4 right-4 hover:h-14 hover:w-14 transition-all duration-300 ease-in-out delay-75"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {review.collegeName}
                  </h2>
                  <p className="text-gray-600">{review.review}</p>
                  {review.creator === user?.firstName || review.userId === token ? (
                    <div className="absolute bottom-4 right-4">

                      <Link href={`/Dashboard/Edit/${review.id}`}>
                        <button className="text-white  bg-black p-2 rounded-lg mr-5">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteButton id={review.id} />
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsPage;
