import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models2/Personal";

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
    const users = await User.find();

    // Send the response with the users' data
    res.status(200).json(users);
    console.log(users)
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res.status(500).json({ message: (error as Error).message });
  }
}
