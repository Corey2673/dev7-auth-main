import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface IRegisterFormProps {}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const [allUsers, setAllUsers] = useState([
   { 
    firstname:"",
    lastname:"",
    role:"",
    employeeID:"",
    _id:"",
    employeestatus:""
   }
  ]);
    const [editingUser, setEditingUser] = useState(
        { 
    firstname:"",
    lastname:"",
    role:"",
    employeeID:"",
    id:"",
    employeestatus:""
   }
    );

   const editUser = (user: any) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    if (
      editingUser &&
      editingUser.firstname &&
      editingUser.lastname &&
      editingUser.employeeID &&
      editingUser.employeestatus
    ) {
    //   setAllUsers(
    //     allUsers.map((user) => (user.id === editingUser.id ? editingUser : user))
    //   );
      setEditingUser(    { 
    firstname:"",
    lastname:"",
    role:"",
    employeeID:"",
    id:"",
    employeestatus:""
   });
    }
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/auth/getusers");
        setAllUsers(data);
        console.log(allUsers)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  


 

  return (
    <div className="w-full px-12 py-4">
      {/* <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Create Personal
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
  {
  allUsers && allUsers.map((user) => (
  
    <div
   
      key={user._id}
      className="rounded-md overflow-hidden border border-gray-200"
    >
  <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
  <div className="p-4">
    <h2 className="text-lg font-semibold mb-1">
      {user.firstname} {user.lastname}
    </h2>
    <p className="text-sm text-gray-600 mb-2">{user.role}</p>
    <p className="text-sm text-gray-600 mb-2">
      Badge ID: {user.employeeID}
    </p>
    <p className="text-sm text-gray-600 mb-2">
      {user.employeestatus}
    </p>
  </div>
</div>
      <div className="flex justify-end p-2">
        <button
          className="text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={() => editUser(user)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-600 ml-2 focus:outline-none"
         
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default RegisterForm;
