import Link from "next/link";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:h-[80vh] lg:mt-16 px-4  md:px-16 lg:px-24 mt-10">
      {/* Left Side */}
      <div className="lg:w-1/2 lg:flex lg:flex-col lg:items-start lg:justify-center lg:pr-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-6">Welcome to CollegeReviewHub</h1>
        <p className="text-lg mb-10">
          Share and read honest reviews about colleges from students like you.
          Make informed decisions about your educational future.
        </p>
        <Link
        href="/Signup"
        >
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 mb-6">
          Get Started
        </button>
        </Link>
      </div>

      <div className="lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1400&q=60"
          alt="College"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Home;