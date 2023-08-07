// import mongoose from "mongoose";
const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    usenewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log("database connection failed", err));

// export default mongoose;
