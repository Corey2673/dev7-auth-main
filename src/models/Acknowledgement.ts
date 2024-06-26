import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
   
  },
  questionID: {
    type: String,

  },
  siteLocation: {
    type: String,
  },
   timestamp: {
    type: String,
  },
  signature: {
    type: String,
  },

comfirmed:{
    type: String, 
} 
 
  
});

const Acknowledge = mongoose.models.acknowledge || mongoose.model("acknowledge", userSchema);

export default Acknowledge;
