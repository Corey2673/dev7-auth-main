import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
   
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
comfirmed:{
    type: String, 
} ,
questionTitle:{
    type: String, 
} 
 
  
});

const Acknowledge = mongoose.models.acknowledge || mongoose.model("acknowledge", userSchema);

export default Acknowledge;
