import mongoose from "mongoose";

const dbConnect = async () => {
  const db = await mongoose.connect(process.env.MONGO_ATLAS_URI, {});
  console.log(`Mongo atlas is connected on ${db.connection.host}`);
};

export { dbConnect };
