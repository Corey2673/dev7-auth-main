import React from "react";
import "./App.css"; // Assuming you have the Tailwind directives here

const App = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/path/to/your/image.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">User Form</h1>
      </div>
    </div>
  );
};

export default App;

<div className="grid grid-cols-1 gap-4 justify-center">
  {!foundUser || foundUser === null ? (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        Computacenter Customer Site Safety Log
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
</div>;





------------------------




<div className="flex justify-center items-center min-h-screen bg-gray-100 p-3">
      <div className="container mx-auto">
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50">
            <img src="auth/log.jpg" />



            
          </div>
        </div>
      </div>
    </div>