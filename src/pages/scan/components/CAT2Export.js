import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const CAT2Export = () => {
  const [clockData, setClockData] = useState();
  const filterFTEUsers = () => {
    useEffect(() => {
      const fetchClockData = async () => {
        try {
          const { data } = await axios.get("/api/auth/getclockdata");
          setClockData(data);
        } catch (error) {
          console.error("Error fetching clock data:", error);
        }
      };
      fetchClockData();
    }, []);

    const allUsers = clockData || [];

    return allUsers.filter(
      (user) => user.employmentStatus === "Full Time Employee (FTE)"
    );
  };

  return (
    <div>
      <CSVLink
        data={filterFTEUsers()}
        filename={"CAT2_FTE_REPORT.csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        CAT2 Download
      </CSVLink>
    </div>
  );
};

export default CAT2Export;
