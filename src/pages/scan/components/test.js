import React, { useState, useEffect } from "react";

import FaceReconnition from "@/pages/components/FaceRecognition";
import Badge_Scan from "@/components/inputs/badge_scan";
import axios from "axios";

const UserList = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const [location, setLocation] = useState(null);
  const [badgeID, setBadgeID] = useState("");

  const [foundUser, setFoundUser] = useState(null);
  const [users, setUsers] = useState();

  // if (typeof localStorage !== "undefined") {
  //   storedUsers = JSON.parse(localStorage.getItem("users"));
  // }

  // const user = storedUsers.find((user) => user.badgeID === badgeID);

  // Function to load users from MongoDB
  const loadUsers = async () => {
    try {
      const response = await axios.fetch("/api/auth/getusers");
      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    loadUsers;
  });

  const handleSearch = () => {
    // if (!storedUsers) {
    //   console.log("No users found in local storage.");
    //   return;
    // }
    console.log(users);
    if (users) {
      setClockedIn(() => {
        const savedLogs = "";

        if (savedLogs) {
          const logs = JSON.parse(savedLogs);
          const lastLog = logs.find(
            (log) => log.userId === user.id && log.type === "IN"
          );
          return !!lastLog;
        }
        return false;
      });

      setFoundUser(users);
      setShowQuestions(users.questions !== null);
    } else {
      setFoundUser(null);
      setShowQuestions(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="container mx-auto">
        <div
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('auth/log.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 justify-center">
              <FaceReconnition />
              <Badge_Scan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
