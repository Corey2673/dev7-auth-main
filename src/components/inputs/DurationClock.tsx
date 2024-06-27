import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface IRegisterFormProps {
  data: any;
  siteLocation: String

}




const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const { data , siteLocation } = props;
  


const [enterTime, setEnterTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [clockAction, setClockAction] = useState([]);

  const handleSubmit = async (
    
    userID: any, 
    firstname: any,
    lastname: any,
    role: any,
    startTime: string,
    lunchTime: string,
    endTime: string,
    siteLocation: String,
    timestampIN: any,
    timestampOUT: any,
     employmentStatus: any
    ) => {

    const a = [
           ...clockAction,
        {
        userID,
  firstname,
  lastname,
  role,
  startTime,
  lunchTime,
  endTime,
  siteLocation,
  timestampIN,
  timestampOUT,
  employmentStatus
        }
      ]
     
    try {
     await axios.post("/api/auth/addclockdata", {
         ...a[0]
      });
    
    } catch (error: any) {
     
    }
      
  //   event.preventDefault();
  //   console.log('Enter Time:', enterTime);
  //   console.log('Lunch Time:', lunchTime);
  //   console.log('Departure Time:', departureTime);
  //   // You can add more actions here, like sending the data to an API
   };



  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Expected Onsite Duration</h2>
        <div className="mb-4">
          <label htmlFor="enter-time" className="block text-gray-700 text-sm font-bold mb-2">
            Enter Time
          </label>
          <input
            id="enter-time"
            type="time"
            placeholder="Enter Time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={enterTime}
            onChange={(e) => setEnterTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lunch-time" className="block text-gray-700 text-sm font-bold mb-2">
            Expected Lunch Time
          </label>
          <input
            id="lunch-time"
            type="time"
            placeholder="Expected Lunch Time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lunchTime}
            onChange={(e) => setLunchTime(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="departure-time" className="block text-gray-700 text-sm font-bold mb-2">
            Expected Departure Time
          </label>
          <input
            id="departure-time"
            type="time"
            placeholder="Expected Departure Time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>
        {enterTime && lunchTime && departureTime !== '' && 
        <div className="flex items-center justify-center">
          <button
          onClick={(e) => handleSubmit(
            data._id, 
            data.firstname,
            data.lastname,
            data.role, 
            enterTime,
            lunchTime,
            departureTime,
            siteLocation,
            new Date(),
            null, 
            data.employeestatus
          )}
           
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>}
      </form>
    </div>
  );

  
};

export default RegisterForm;
