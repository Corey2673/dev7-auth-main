import React, { useState } from "react";
import ClockInOut from "./ClockInOut";
import AddUser from "./AddUser";
import StatusTable from "./StatusTable";
import TEST from "./test";
import SafetyQuestions from "./SafetyQuestions";
import CSVExport from "./Import_ExportData.js";
import VendorLog from "./AddVendor.js";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("test");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-6">
          <img
            src="auth/a.png"
            alt="sidebar image"
            className="w-35
             h-39 mb-2"
          />
          {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}

          <nav className="mt-6">
            <ul>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("test")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l6-6m0 0l6 6m-6-6v14"
                    />
                  </svg>
                  <span>Safety Check</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("statusTable")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span>Onsite Personal</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("addUser")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Users</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("safetyQuestions")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Safety Questions</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("exportData")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Data</span>
                </button>
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleComponentChange("vendorLog")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Vendor Log</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-10 bg-gray-100">
        {activeComponent === "addUser" && <AddUser />}
        {activeComponent === "statusTable" && <StatusTable />}
        {activeComponent === "test" && <TEST />}
        {activeComponent === "safetyQuestions" && <SafetyQuestions />}
        {activeComponent === "exportData" && <CSVExport />}
        {activeComponent === "vendorLog" && <VendorLog />}
      </main>
    </div>
  );
};

export default Dashboard;
