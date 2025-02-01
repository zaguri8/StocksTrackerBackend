import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db = mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database");
    console.log(error);
  });
export default db;
