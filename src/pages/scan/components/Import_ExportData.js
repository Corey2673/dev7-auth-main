import React, { useState } from "react";
import { CSVLink } from "react-csv";

import CSVExportButton from "./ExportButton.js";
import CsvImporter from "./ImportButton.js";
import CAT2Report from "./CAT2Export.js";

const App = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      role: "Shop Floor",
      badgeID: "123",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      role: "Control Room",
      badgeID: "456",
    },
  ]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    badgeID: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ firstName: "", lastName: "", role: "", badgeID: "" });
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const updateUser = () => {
    setUsers(
      users.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setEditingUser(null);
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>

          <h2 className="text-2xl font-bold mb-4">CAT2</h2>
          <CAT2Report />

          <h2 className="text-2xl font-bold mb-4">Export On-Site Clock Data</h2>
          <CSVExportButton dataSet={"onsite_clock"} fileName={"onsite_clock"} />

          <h2 className="text-2xl font-bold mb-4">Export Questions Data</h2>
          <CSVExportButton dataSet={"questions"} fileName={"questions"} />

          <h2 className="text-2xl font-bold mb-4">
            Export Acknowledgment Data
          </h2>
          <CSVExportButton
            dataSet={"acknowledgments"}
            fileName={"acknowledgments"}
          />

          <h2 className="text-2xl font-bold mb-4">Export User Data</h2>
          <CSVExportButton dataSet={"users"} fileName={"users"} />

          <h2 className="text-2xl font-bold mb-4">Import Onsite Clock Data</h2>
          <CsvImporter dataSet={"onsite_clock"} />

          <h2 className="text-2xl font-bold mb-4">Import Questions Data</h2>
          <CsvImporter dataSet={"questions"} />

          <h2 className="text-2xl font-bold mb-4">
            Import Acknowledgments Data
          </h2>
          <CsvImporter dataSet={"acknowledgments"} />

          <h2 className="text-2xl font-bold mb-4">Import User Data</h2>
          <CsvImporter dataSet={"users"} />
        </div>
      </div>
    </div>
  );
};

export default App;
