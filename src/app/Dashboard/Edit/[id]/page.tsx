import EditReview from "../../../../components/EditReviewForm"

const getReviewById = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:3000/api/Reviews/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch Review");
      }
  
      const reviewData = await res.json(); // Await the promise here
      console.log(reviewData);
      return reviewData;
    } catch (error) {
      console.log("Error fetching review:", error);
      throw error;
    }
  };
  
"use  client"
export default async function Edit({ params }: any) {
    try {
      const { id } = params;
      console.log(id);
      const { collegeName, review } = await getReviewById(id);
      console.log("Received data:", { collegeName, review });
  
      return <EditReview id={id} collegeName={collegeName} review={review} />;
    } catch (error) {
      console.error("Error in EditTopic:", error);
    }
  }
  