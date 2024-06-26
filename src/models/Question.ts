import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
  question: {
    type: String,
  },
  siteLocation: {
    type: String,
  },
   repeated: {
    type: String,
  },
  signature: {
    type: String,
  },
 
  
});

const Question = mongoose.models.question || mongoose.model("question", userSchema);

export default Question;
