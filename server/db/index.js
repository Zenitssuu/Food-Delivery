import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Database connected");
    
  } catch (error) {
    console.log(error);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// module.exports = connectDB;
