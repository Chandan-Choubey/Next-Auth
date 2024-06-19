import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connected");
    });

    connection.on("error", (err) => {
      console.log("Mongodb connection error", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("something went wrong in db Connection ", error);
  }
}
