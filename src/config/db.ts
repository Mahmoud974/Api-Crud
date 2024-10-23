import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    // Vérifiez si MONGO_URI est défini et est une chaîne de caractères
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables"
      );
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
