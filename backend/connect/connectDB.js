import mongoose from "mongoose";
export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully yay!!!!");
  } catch (error) {
    console.log(error);
  }
};
