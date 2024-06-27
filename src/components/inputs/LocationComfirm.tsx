import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DurationClock from "./DurationClock";
import AskQSafety from "../forms/AskQSafety";

interface IRegisterFormProps {
  data: any;

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
  const { data } = props;
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
return <AskQSafety data={data} siteLocation={selectedSiteLocation}  />
  

}
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
  
      {/* Personal Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Choose your Site Location
        </h3>
     </div>
      {/* Site Location Selection */}
      <div className="mb-6">
        <label htmlFor="sitelocation" className="block text-gray-700">
          Site Location
        </label>
      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg flex justify-center">
          {["Battery Plant", "Vehicle Plant"].map((dept) => (
            <label
              key={dept}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                id="sitelocation"
                value={dept}
                {...register("sitelocation")}
               className="form-radio text-indigo-600 focus:ring-indigo-500 focus:border-indigo-500 p-4"

                onChange={handleSiteLocationChange}
              />
              <span className="text-gray-800">{dept}</span>
            </label>
          ))}
        </div>
        {errors.sitelocation && (
          <p className="text-red-500 text-xs mt-1">{errors.sitelocation.message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
