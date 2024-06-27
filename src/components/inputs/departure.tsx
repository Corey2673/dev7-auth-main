import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Timestamp } from "mongodb";

interface IRegisterFormProps {
 
  dataClock: any
  _id:string

}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const { dataClock } = props;
  



const a = {timestampOUT: new Date()}


async function updateClockData(id: any, updatedData: any) {
  try {
    const response = await fetch('/api/auth/updateclockdata', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, updatedData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated data:', data);
    return data;
  } catch (error) {
    console.error('Error updating data:', error);
  }
}






  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
     
        <div className="flex items-center justify-center">
          <button
          onClick={(e) => updateClockData(
            dataClock[0]._id, 
            a
        
            
        )}
           
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  
};

export default RegisterForm;
