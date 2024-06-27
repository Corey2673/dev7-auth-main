import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import ClockData from "@/models/ClockData"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    await connectDb();

    // Check if the request method is GET
    if (req.method !== 'GET') {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Fetch all users from the User model
    const clockdata = await ClockData.find();

    // Send the response with the users' data
    res.status(200).json(clockdata);
    console.log(clockdata)
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res.status(500).json({ message: (error as Error).message });
  }
}