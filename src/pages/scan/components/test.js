import React, { useState } from "react";
import TestAck from "./testack.js";

import ClockButton from "./ClockButton.js";

const UserList = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  let storedUsers = [];
  const [location, setLocation] = useState(null);
  const [badgeID, setBadgeID] = useState("");

  const [foundUser, setFoundUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = "";
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  if (typeof localStorage !== "undefined") {
    storedUsers = JSON.parse(localStorage.getItem("users"));
  }

  const user = storedUsers.find((user) => user.badgeID === badgeID);

  const handleSearch = () => {
    if (!storedUsers) {
      console.log("No users found in local storage.");
      return;
    }
    console.log(user);
    if (user) {
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

      setFoundUser(user);
      setShowQuestions(user.questions !== null);
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
              {!foundUser || foundUser === null ? (
                <div className="text-center">
                  <img
                    src="auth/m3.png"
                    alt="Logo"
                    className="mx-auto mb-4 w-40  h-40"
                  />
                  <h1 className="text-4xl font-bold mb-4 text-white">
                    Customer Location Safety Check-in
                  </h1>
                  <input
                    type="text"
                    placeholder="Start"
                    name="badgeID"
                    value={badgeID}
                    onChange={(e) => setBadgeID(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none focus:border-blue-500"
                  />
                  <button
                    className={`mt-4 w-full bg-${
                      clockedIn ? "red" : "blue"
                    }-500 text-white px-4 py-2 rounded-lg`}
                    onClick={handleSearch}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:translate-x-5">
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {foundUser.firstName} {foundUser.lastName}
                      </h2>
                      <p className="text-gray-500 mb-4">{foundUser.role}</p>
                      {clockedIn ? (
                        <div>
                          <ClockButton user={foundUser} />
                        </div>
                      ) : (
                        <p className="text-gray-500 mb-4">{location}</p>
                      )}
                      {location === null && clockedIn === false ? (
                        <div>
                          <div>
                            <input
                              type="radio"
                              id="batteryPlant"
                              name="location"
                              value="Battery Plant"
                              onChange={(e) => setLocation(e.target.value)}
                              className="mr-1"
                            />
                            <label htmlFor="batteryPlant">Battery Plant</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="vehiclePlant"
                              name="location"
                              value="Vehicle Plant"
                              onChange={(e) => setLocation(e.target.value)}
                              className="mr-1"
                            />
                            <label htmlFor="vehiclePlant">Vehicle Plant</label>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {location !== null && (
                      <TestAck user={foundUser} siteLocation={location} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
