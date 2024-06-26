import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationComfirm from "../inputs/LocationComfirm";

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

  const [profileComfirm, setProfileComfirm] = React.useState(false)
  

//   const onSubmit: SubmitHandler<FormSchemaType> = (formData) => {
//     // Handle form submission here
//     console.log(formData);
//   };


if (profileComfirm) {
  return <LocationComfirm data={data[0]}/>
}


  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        User Profile
      </h2>

      {/* Personal Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              First Name:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].firstname}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Last Name:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].lastname}
            </p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Employee ID:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].employeeID}
            </p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Phone Number:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].phone}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Emergency Contact Name:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].emergencycontactname}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Emergency Contact Number:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].emergencycontactnumber}
            </p>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Employee Status:
            </label>
            <p className="bg-gray-200 rounded p-2 text-gray-800">
              {data[0].employeestatus}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={()=>setProfileComfirm(true)}
        >
        Comfirm
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
