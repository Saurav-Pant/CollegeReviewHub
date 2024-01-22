"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useClerk } from "@clerk/nextjs";
import Cookies from 'js-cookie';


interface Review {
  collegeName: string;
  review: string;
}

const ReviewSubmission: React.FC = () => {
  const [reviewData, setReviewData] = useState<Review>({
    collegeName: "",
    review: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useClerk();
  const userId = Cookies.get('userId');



  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...reviewData,
      creator:user?.firstName || "",
      creatorImgUrl:user?.imageUrl|| "",
      userId
    };

    fetch("api/Reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.success) {
          router.push("/Reviews");
          router.refresh();
          console.log(data)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error submitting review:", error);
      });
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 h-[90vh] mt-10 relative"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      <BackButton link="/Reviews" />
      <h1 className="text-4xl font-bold my-10 pt-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Submit Your Review
      </h1>
      <form className="space-y-4" onSubmit={handleReview}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="collegeName" className="text-lg font-semibold">
            College Name
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            placeholder="Enter the college name"
            value={reviewData.collegeName}
            onChange={(e) =>
              setReviewData({ ...reviewData, collegeName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="review" className="text-lg font-semibold">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            rows={6}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            placeholder="Write your review here"
            value={reviewData.review}
            onChange={(e) =>
              setReviewData({ ...reviewData, review: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-center">
          {!loading ? (
            <button
              type="submit"
              className="bg-gray-950 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-700"
            >
              Submit Review
            </button>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewSubmission;
