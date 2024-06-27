import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   userID: {
    type: String,
  },
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
   
  },
  role: {
    type: String,
   
  },
  startTime: {
    type: String,

  },
   lunchTime: {
    type: String,

  },
  endTime: {
    type: String,

  },
  siteLocation: {
    type: String,
  },
   timestampIN: {
    type: String,
  },
     timestampOUT: {
    type: String,
  },
employmentStatus:{
    type: String, 
} 
  
});

const ClockData = mongoose.models.clockdata || mongoose.model("clockdata", userSchema);

export default ClockData;
