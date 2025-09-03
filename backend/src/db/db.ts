import mongoose from "mongoose";

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/noteapp");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

export default dbConnection;
