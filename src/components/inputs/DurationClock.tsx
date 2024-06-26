import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRegisterFormProps {
  data: any;
  siteLocation: String

}

const FormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(32, "First name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
    lastname: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(32, "Last name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
    emergencycontactname: z
      .string()
      .min(2, "Emergency contact name must be at least 2 characters")
      .max(32, "Emergency contact name must be less than 32 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
    emergencycontactnumber: z
      .string()
      .min(2, "Emergency contact number must be at least 2 characters")
      .max(32, "Emergency contact number must be less than 32 characters"),
    phone: z
      .string()
      .min(2, "Contact number must be at least 2 characters")
      .max(32, "Contact number must be less than 32 characters"),
    employeeID: z.string(),

    sitelocation: z.enum(["Battery Plant", "Vehicle Plant"], {
      required_error: "Site location is required",
    }),
    employeestatus: z.enum(
      ["Full Time Employee (FTE)", "Contracted Employee (CTE)"],
      {
        required_error: "Employee status is required",
      }
    ),
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const { data , siteLocation } = props;

    console.log(data)
  console.log(siteLocation)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [selectedSiteLocation, setSelectedSiteLocation] = useState<string>("");

  const handleSiteLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSiteLocation(event.target.value);
  };
if (selectedSiteLocation) {

  console.log(selectedSiteLocation)
}

const [enterTime, setEnterTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Enter Time:', enterTime);
  //   console.log('Lunch Time:', lunchTime);
  //   console.log('Departure Time:', departureTime);
  //   // You can add more actions here, like sending the data to an API
  // };
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
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
