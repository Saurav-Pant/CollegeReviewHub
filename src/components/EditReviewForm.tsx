"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EditReview({ id, collegeName, review }: any) {
    const [newCollegeName, setNewCollegeName] = useState(collegeName);
    const [newReview, setNewCollegeDescription] = useState(review);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            const URL = "https://college-review-hub.vercel.app"
            // const URL = "http://localhost:3000"; //deployment
            const res = await fetch(`${URL}/api/Reviews/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newCollegeName, newReview }),
            });


            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.refresh();
            router.push("/Dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh] bg-white">
            <form className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-lg sm:w-96">
                <h1 className="text-center text-2xl font-bold mb-4">Edit Review</h1>

                <input
                    onChange={(e) => setNewCollegeName(e.target.value)}
                    value={newCollegeName}
                    className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    placeholder="Topic Title"
                />

                <textarea
                    onChange={(e) => setNewCollegeDescription(e.target.value)}
                    value={newReview}
                    className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Topic Description"
                />

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        onClick={handleSubmit}
                    >
                        Update Review
                    </button>
                )}
            </form>
        </div>
    );
}