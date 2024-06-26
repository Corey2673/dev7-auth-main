import React, { useState, useEffect, ChangeEvent } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  badgeID: string;
  employmentStatus: string;
  employmentID: string;

};

const AddUser: React.FC = () => {
  // Function to load users from localStorage



  <AddUser></AddUser>
  
 // Function to load users from MongoDB
  const loadUsers = async () => {
    try {
      const response = await fetch("/api/auth/getusers");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);


  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    role: "",
    badgeID: "",
    employmentStatus: "",
    employmentID: ""
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showUsers, setShowUsers] = useState(false); // State to manage the visibility of users

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    }
  };

  const addUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.badgeID) {
      const id = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { ...newUser, id }]);
      setNewUser({
        id: 0,
        firstName: "",
        lastName: "",
        role: "",
        badgeID: "",
        employmentStatus: "",
        employmentID: ""
      });
    } else {
      // Add alert here
    }
  };

  const editUser = (user: User) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    if (
      editingUser &&
      editingUser.firstName &&
      editingUser.lastName &&
      editingUser.badgeID &&
      editingUser.employmentStatus&&
      editingUser.employmentID
    ) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
    }
  };

  const removeUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };



  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">User List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Hide All Users" : "Show All Users"}
        </button>
        {showUsers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded shadow hover:translate-x-1 transition-transform"
              >
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-gray-600">Badge ID: {user.badgeID}</p>
                <p className="text-gray-600">
                  Employment Status: {user.employmentStatus}
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => removeUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {editingUser === null ? (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Badge ID"
              name="badgeID"
              value={newUser.badgeID}
              onChange={handleInputChange}
            />
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Employee ID"
              name="employmentID"
              value={newUser.employmentID}
              onChange={handleInputChange}
            />
            <div className="flex space-x-4 mb-4">
              <div>
                <p className="mb-2">Role</p>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Shop Floor"
                      checked={newUser.role === "Shop Floor"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Shop Floor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Control Room"
                      checked={newUser.role === "Control Room"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Control Room</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Client Team"
                      checked={newUser.role === "Client Team"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Client Team</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Management"
                      checked={newUser.role === "Management"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Management</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-2">Employment Status</p>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="FTE"
                      checked={newUser.employmentStatus === "FTE"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">
                      Full Time Employee (FTE)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="CTR"
                      checked={newUser.employmentStatus === "CTR"}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">
                      Contracted Employee (CTR)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addUser}
            >
              Add User
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="First Name"
              name="firstName"
              value={editingUser.firstName}
              onChange={handleUpdateChange}
            />
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Last Name"
              name="lastName"
              value={editingUser.lastName}
              onChange={handleUpdateChange}
            />
            <input
              className="border p-2 rounded w-full mb-4"
              placeholder="Badge ID"
              name="badgeID"
              value={editingUser.badgeID}
              onChange={handleUpdateChange}
            />
            <div className="flex space-x-4 mb-4">
              <div>
                <p className="mb-2">Role</p>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Shop Floor"
                      checked={editingUser.role === "Shop Floor"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">Shop Floor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Control Room"
                      checked={editingUser.role === "Control Room"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">Control Room</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Vendor"
                      checked={editingUser.role === "Vendor"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">Vendor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Client Team"
                      checked={editingUser.role === "Client Team"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">Client Team</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="Management"
                      checked={editingUser.role === "Management"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">Management</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-2">Employment Status</p>
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="FTE"
                      checked={editingUser.employmentStatus === "FTE"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">
                      Full Time Employee (FTE)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="employmentStatus"
                      value="CTR"
                      checked={editingUser.employmentStatus === "CTR"}
                      onChange={handleUpdateChange}
                    />
                    <span className="ml-2">
                      Contracted Employee (CTR)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
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
