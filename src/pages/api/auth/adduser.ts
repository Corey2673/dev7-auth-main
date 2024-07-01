import User from "@/models2/Personal";
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/utils/tokens";
import sendMail from "@/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { 
      firstname, 
      lastname,  
      phone,
      employeestatus,
      emergencycontactname,
      emergencycontactnumber,
      role,
      employeeID
    } = req.body;
 
    // if (!firstname) {
    //     
    //   return res.status(400).json({ message: "Please fill in all fields." });
    // }
    // if (!validator.issitelocation(sitelocation)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please Add a valid sitelocation address." });
    // }
    // if (!validator.isMobilePhone(phone)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please Add a valid phone number." });
    // }
    // const user = await User.findOne({
    //   phone: phone,
    // });
    // if (user) {
    //   return res
    //     .status(400)
    //     .json({ message: "This email address already exists." });
    // }
    // if (password.length < 6) {
    //   return res
    //     .status(400)
    //     .json({ message: "Password must be atleast 6 characters." });
    // }
    // const cryptedPassword = await bcrypt.hash(password, 12);
     


    const newuser = new User({
      firstname: firstname ,
      lastname:lastname,
      employeestatus:employeestatus,
      emergencycontactname:emergencycontactname,
      emergencycontactnumber: emergencycontactnumber,
      phone:phone,
      role: role,
      employeeID: employeeID,
      badgeID: employeeID
   
    });
    await newuser.save();
 
    res.json({
      message: "Register success! Please activate your account to start.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
