import React, { useState, useEffect } from "react";

const AddUser = () => {
  const [users, setUsers] = useState(loadUsers());
  const [vendors, setVendors] = useState(
    loadUsers().filter((user) => user.role === "Vendor")
  );
  const [newUser, setNewUser] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  // Function to load users from localStorage
  const loadUsers = () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const addUser = (e) => {
    if (newUser.firstName && newUser.lastName && newUser.company) {
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id, ...newUser }]);
      setNewUser({
        firstName: "",
        lastName: "",
        company: "",
        eName: "",
        eNumber: "",
        badgeID: "",
        role: "",
        employmentStatus: "",
      });
    } else {
      // Handle alert here if necessary
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    if (
      editingUser &&
      editingUser.firstName &&
      editingUser.lastName &&
      editingUser.badgeID &&
      editingUser.employmentStatus
    ) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    }
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 flex justify-center items-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-4">Vendor Log</h1>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-3 rounded"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Hide Vendors" : "Show Vendors"}
        </button>

        {showUsers && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map((user) => (
              <div key={user.id} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-semibold mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {user.company} {user.role}
                </p>
                <p className="text-sm text-gray-500">
                  Badge ID: {user.badgeID}
                </p>
                <div className="text-right mt-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => editUser(user)}
                  ></button>
                  <button
                    className="text-red-500 hover:text-red-600 ml-2"
                    onClick={() => removeUser(user.id)}
                  ></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingUser === null ? (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Add User</h2>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Company"
              name="company"
              value={newUser.company}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Emergency Contact Name"
              name="eName"
              value={newUser.eName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Emergency Contact Number"
              name="eNumber"
              value={newUser.eNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Badge ID"
              name="badgeID"
              value={newUser.badgeID}
              onChange={handleInputChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
              onClick={addUser}
            >
              Add User
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Edit User</h2>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="First Name"
              name="firstName"
              value={editingUser.firstName}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Last Name"
              name="lastName"
              value={editingUser.lastName}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              placeholder="Badge ID"
              name="badgeID"
              value={editingUser.badgeID}
              onChange={handleUpdateChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block mb-1">Role</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                  name="role"
                  value={editingUser.role}
                  onChange={handleUpdateChange}
                >
                  <option value="Vendor">Vendor</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Employee Status</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                  name="employmentStatus"
                  value={editingUser.employmentStatus}
                  onChange={handleUpdateChange}
                >
                  <option value="FTE">Full Time Employee (FTE)</option>
                  <option value="CTR">Contracted Employee (CTR)</option>
                </select>
              </div>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
              onClick={updateUser}
            >
              Update User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
