import React, { useState } from "react";
import { CSVLink } from "react-csv";

const CAT2Export = () => {
  const filterFTEUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem("onsite_clock")) || [];

    return allUsers.filter((user) => user.employmentStatus === "FTE");
  };

  return (
    <div>
      <CSVLink
        data={filterFTEUsers()}
        filename={"CAT2_FTE_REPORT.csv"}
        className="btn btn-primary"
      >
        CAT2 Download
      </CSVLink>
    </div>
  );
};

export default CAT2Export;
