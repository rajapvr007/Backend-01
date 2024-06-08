import mongoose from "mongoose";
import DB_NAME from "../contants.js";

const connectDB = async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGO_URL}${DB_NAME}`
  );

  console.log(
    `\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
  );
  try {
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
export default connectDB;
