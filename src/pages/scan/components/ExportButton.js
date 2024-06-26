import React, { useState } from "react";
import { CSVLink } from "react-csv";

const CsvExample = ({ dataSet, fileName }) => {
  const [csvData, setCsvData] = useState(
    JSON.parse(localStorage.getItem(dataSet)) || []
  );

  return (
    <div>
      <CSVLink
        data={csvData}
        filename={fileName + ".csv"}
        className="btn btn-primary"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default CsvExample;
