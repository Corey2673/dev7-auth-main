import React, { useState, useEffect } from "react";
import AddUserForm from "@/components/forms/AddUserForm";

const AddUser = () => {
  // Function to load users from localStorage
  const loadUsers = () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  const [users, setUsers] = useState(loadUsers());
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
    badgeID: "",
    employmentStatus: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showUsers, setShowUsers] = useState(false); // State to manage the visibility of users

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
    e.preventDefault();
    if (newUser.firstName && newUser.lastName && newUser.badgeID) {
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id, ...newUser }]);
      setNewUser({
        firstName: "",
        lastName: "",
        role: "",
        badgeID: "",
        employmentStatus: "",
      });
    } else {
      alert("Please fill in all required fields.");
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
    <div className="container mx-auto bg-gray-100 flex items-center justify-center ">
      <div className=" bg-white rounded-md shadow-md">
        <AddUserForm></AddUserForm>

        {editingUser === null ? (
          <div className="mt-4">
            {/* <h2 className="text-lg font-semibold mb-2">Add User</h2>
            <form onSubmit={addUser}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Badge ID"
                name="badgeID"
                value={newUser.badgeID}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Shop Floor"
                    checked={newUser.role === "Shop Floor"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Shop Floor
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Control Room"
                    checked={newUser.role === "Control Room"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Control Room
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="FTE"
                    checked={newUser.employmentStatus === "FTE"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Full Time Employee (FTE)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="CTR"
                    checked={newUser.employmentStatus === "CTR"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Contracted Employee (CTR)
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2"
              >
                Add User
              </button>
            </form> */}
          </div>
        ) : (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Edit User</h2>
            <form>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={editingUser.firstName}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={editingUser.lastName}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Badge ID"
                name="badgeID"
                value={editingUser.badgeID}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Shop Floor"
                    checked={editingUser.role === "Shop Floor"}
                    onChange={handleUpdateChange}
                    className="mr-1"
                  />
                  Shop Floor
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Control Room"
                    checked={editingUser.role === "Control Room"}
                    onChange={handleUpdateChange}
                    className="mr-1"
                  />
                  Control Room
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="FTE"
                    checked={editingUser.employmentStatus === "FTE"}
                    onChange={handleUpdateChange}
                    className="mr-1"
                  />
                  Full Time Employee (FTE)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="CTR"
                    checked={editingUser.employmentStatus === "CTR"}
                    onChange={handleUpdateChange}
                    className="mr-1"
                  />
                  Contracted Employee (CTR)
                </label>
              </div>
              <button
                onClick={updateUser}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
              >
                Update User
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
