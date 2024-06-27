import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const CsvExample = ({ dataSet, fileName }) => {
  const [csvData, setCSVData] = useState();

  const filterFTEUsers = () => {
    useEffect(() => {
      const fetchClockData = async () => {
        try {
          const { data } = await axios.get("/api/auth/" + dataSet);

          setCSVData(data);
        } catch (error) {
          console.error("Error fetching clock data:", error);
        }
      };
      fetchClockData();
    }, []);

    const allData = csvData || [];

    return allData;
  };

  return (
    <div>
      <CSVLink
        data={filterFTEUsers()}
        filename={fileName + ".csv"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default CsvExample;
