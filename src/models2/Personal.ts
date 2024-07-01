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
  badgeID: {
    type: String,
   
  },
  employeestatus: {
    type: String,

  },
  emergencycontactname: {
    type: String,
  },
   emergencycontactnumber: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
  },
   employeeID: {
    type: String,
  },

  
});

const Personal = mongoose.models.personal || mongoose.model("personal", userSchema);

export default Personal;
