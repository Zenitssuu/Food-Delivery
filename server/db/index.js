import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Database connected");
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// module.exports = connectDB;
