"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";

interface Review {
  _id: number;
  collegeName: string;
  review: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    reviews?.filter((review) =>
      review.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen relative">
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          <BackButton link="/" />
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for a college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {filteredReviews.map((review) => (
              <motion.div
                key={review._id}
                className="bg-white rounded-lg shadow-md p-6 h-60 flex flex-col justify-center hover:shadow-xl transition-shadow duration-300 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h4
                  className="absolute top-4 right-4 font-medium bg-gray-100 px-4 py-2 rounded shadow-md hover:shadow-xl  transition-shadow duration-300 ease-in-out
                "
                >
                  Name
                </h4>

                <h2 className="text-xl font-semibold mb-2">
                  {review.collegeName}
                </h2>
                <p className="text-gray-600">{review.review}</p>
              </motion.div>
            ))}
          </div>

          <div className="fixed bottom-10 right-4">
            <Link href="ReviewSubmission">
              <button className="bg-gray-950 text-white rounded-full p-4 shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <FaPlus size={20} />
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewsPage;
