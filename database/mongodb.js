import mongoose from 'mongoose'
import {MONGO_DB, NODE_ENV} from "../config/env.js";

if (!MONGO_DB) {
  throw new Error("MongoDB connection string is not defined in the environment variables.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to database', error);
    process.exit(1);
  }
}

export default connectToDatabase;