import mongoose from "mongoose";

const conncetDB = async () => {
  try {
    mongoose.connection.on('connected',()=> console.log("DatabaseConnected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/AdvancedBackend`);
  } catch (error) {
    console.log(error.message);
  }
};

export default conncetDB
