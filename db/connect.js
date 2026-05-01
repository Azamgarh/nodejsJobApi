const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(()=>console.log("Database connected")).catch((err)=>console.log("Database not connected", err))