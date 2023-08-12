import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (err: any) {
    process.exit(1);
  }
};
export default connectToDB;
