import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import ProfileComfirm from "@/components/forms/ProfileComfirm";
import ClockData from "@/models2/ClockData";
import Departure from "./departure";

interface IRegisterFormProps {}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const [allUsers, setAllUsers] = useState([
    { 
      firstname: "",
      lastname: "",
      role: "",
      employeeID: "",
      _id: "",
      employeestatus: ""
    }
  ]);

  const [searchBadgeID, setSearchBadgeID] = useState("");
  const [allClockData, setAllClockData] = useState<any[]>([]); // Update the state type to array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/auth/getusers");
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchClockData = async () => {
      try {
        const { data } = await axios.get("/api/auth/getclockdata");
        setAllClockData(data);
      } catch (error) {
        console.error("Error fetching clock data:", error);
      }
    };
    fetchClockData();
  }, []);




    //  // Check if any clock data meets the condition
    //     data.forEach((clockData: any) => {
    //       if (clockData.userID === data._id && clockData.timestampOUT === null) {
    //         console.log("HELLO");
    //       }
    //     });

    



  const filteredUsers = allUsers.filter(user => 
    user.employeeID.includes(searchBadgeID));
      const foundUser = filteredUsers.length === 1;





  
// if (filteredClockData) {
//       return <DurationClock data={filteredUsers} siteLocation={"undefined"} />;
  
// }
  if (foundUser) {

const filteredClockData = allClockData.filter(data1 => filteredUsers[0]._id === data1.userID && data1.timestampOUT ===null)

if (filteredClockData.length === 1) {
   return <Departure dataClock={filteredClockData} _id={""} />;
  
}else{
   return <ProfileComfirm data={filteredUsers} />;

}
  }

  return (
    <div className="w-full px-12 py-4">
      {/* <AddUserForm></AddUserForm> */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Badge ID"
          value={searchBadgeID}
          onChange={(e) => setSearchBadgeID(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers && filteredUsers.map((user) => (
          <div
            key={user._id}
            className="rounded-md overflow-hidden border border-gray-200"
          >
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
            <div className="flex justify-end p-2"></div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default RegisterForm;
