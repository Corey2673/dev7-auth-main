import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const ClockInOut = ({ user, location }) => {
  const [clockedIn, setClockedIn] = useState(() => {
    const savedLogs = localStorage.getItem("onsite_clock");

    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      const lastLog = logs.find(
        (log) => log.userId === user.id && log.type === "IN"
      );
      return !!lastLog;
    }
    return false;
  });

  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("onsite_clock");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [enterTime, setEnterTime] = useState(null);
  const [exitTime, setExitTime] = useState(null);

  useEffect(() => {
    localStorage.setItem("onsite_clock", JSON.stringify(logs));

    if (localStorage.getItem("showSafetyCheckSuccess") === "true") {
      setShowSuccessMessage(true);
      localStorage.removeItem("showSafetyCheckSuccess");
    }
  }, [logs, location]);

  const handleEnterTimeChange = (date) => {
    setEnterTime(date);

    const newExitTime = new Date(date);
    newExitTime.setHours(newExitTime.getHours() + 9);
    setExitTime(newExitTime);
  };

  const formatDateTimeMin = (date) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const handleExitTimeChange = (date) => {
    const enterTimePlus8Hours = new Date(enterTime);
    enterTimePlus8Hours.setHours(enterTimePlus8Hours.getHours() + 8);

    const enterTimePlus12Hours = new Date(enterTime);
    enterTimePlus12Hours.setHours(enterTimePlus12Hours.getHours() + 12);

    if (date >= enterTimePlus8Hours && date <= enterTimePlus12Hours) {
      setExitTime(formatDateTimeMin(date));
    } else {
      alert("Exit time must be between +8 and +12 hours from the enter time.");
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    setLogs([
      ...logs,
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        siteLocation: location,
        type: "IN",
        startTime: formatDateTimeMin(enterTime),
        endTime: formatDateTimeMin(exitTime),
        actualEnterTime: formatDateTime(now),
        actualExitTime: "N/A",
        employmentStatus: user.employmentStatus,
      },
    ]);
    setClockedIn(true);
    setShowSuccessMessage(true);
    window.location.reload();
  };

  const handleClockOut = () => {
    const now = new Date();
    const updatedLogs = logs.map((log) => {
      if (log.userId === user.id && log.type === "IN") {
        return {
          ...log,
          type: "OUT",
          actualExitTime: formatDateTime(now),
        };
      }
      return log;
    });
    setLogs(updatedLogs);

    setShowSuccessMessage(true);
    window.location.reload();
  };

  return (
    <div className="clock-in-out min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">
            {clockedIn ? "Exiting Site Location" : "Entering Site Location"}
          </h2>
        </div>

        {showSuccessMessage && (
          <div className="mb-4">
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              role="alert"
            >
              <p className="font-bold">Safety Check Success</p>
            </div>
          </div>
        )}

        {!clockedIn && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Enter Time</label>
            <DatePicker
              selected={enterTime}
              onChange={handleEnterTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              customInput={
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              }
            />
          </div>
        )}

        {!clockedIn && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Expected Exit Time
            </label>
            <DatePicker
              selected={exitTime}
              onChange={handleExitTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              customInput={
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              }
            />
          </div>
        )}

        <div>
          <button
            className={`w-full py-3 px-4 text-white rounded-md ${
              clockedIn
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={clockedIn ? handleClockOut : handleClockIn}
          >
            {clockedIn ? "Exit" : "Enter"}
          </button>
        </div>
      </div>
    </div>
  );
};
