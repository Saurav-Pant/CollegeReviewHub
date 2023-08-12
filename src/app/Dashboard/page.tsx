"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";


interface Review {
  id: number;
  collegeName: string;
  review: string;
}

const ReviewsPage: React.FC = ({props}:any) => {
  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    const userid = localStorage.getItem("userId");
    axios
      .get<{ reviews: Review[] }>(`/api/users/Dashboard?userId=${userid}`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);



  return (
    <div className="container mx-auto px-4 py-8 min-h-screen relative">
      <BackButton link="/" />
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="bg-white rounded-lg shadow-md p-6 h-60 flex flex-col justify-center hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">{review.collegeName}</h2>
            <p className="text-gray-600">{review.review}</p>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <Link href="ReviewSubmission">
          <button className="bg-gray-950 text-white rounded-full p-4 shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <FaPlus size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewsPage;
