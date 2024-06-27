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

    // Check if the request method is PUT
    if (req.method === 'PUT') {
      // Extract the id and the updated data from the request body
      const { id, updatedData } = req.body;

      // Update the clock data entry with the specified id
      const updatedClockData = await ClockData.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedClockData) {
        return res.status(404).json({ message: "Entry not found" });
      }

      // Send the response with the updated data
      res.status(200).json(updatedClockData);
      console.log(updatedClockData);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    // Handle errors and send a 500 status with the error message
    res.status(500).json({ message: (error as Error).message });
  }
}
