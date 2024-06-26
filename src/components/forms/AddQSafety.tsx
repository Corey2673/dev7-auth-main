import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";
import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import axios from "axios";
import Link from "next/link";
import ShowPersonal from "../Tables/ShowPersonal";
import SlideSubmit from "../buttons/SlideSubmit";

interface IRegisterFormProps {}

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

    role: z.enum(["Shop Floor", "Client Team", "Control Room", "Inventory", "Management"], {
      required_error: "Department is required",
    }),
      employeestatus: z.enum(["Full Time Employee (FTE)", "Contracted Employee (CTE)"], {
      required_error: "Department is required",
    }),
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/adduser", {
        ...values,
      });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const [showUsers, setShowUsers] = useState(false); // State to manage the visibility of users

  return (
    <div className="w-full px-12 py-4">
   <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={() => setShowUsers(!showUsers)}
      >
          {showUsers ? "Hide All Users" : "Show All Users"}
        </button>
      { showUsers &&  
      <ShowPersonal/>
      }


      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
       Safety Question Form
      </h2>
      
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 md:flex">
          <Input
            name="title"
            label="Title"
            type="text"
            icon={<CiUser />}
            placeholder="Cart Safety"
            register={register}
            error={errors?.firstname?.message}
            disabled={isSubmitting}
          />
     
        </div>

            <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox text-blue-600"
        //   {...register(name)}
        
        />
     
      </label>
   
        <Input
          name="phone"
          label="Contact Number"
          type="text"
          icon={<BsTelephone />}
          placeholder="+1(xxx) xxx-xxxx"
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
        <div className="gap-2 md:flex">
          <Input
            name="emergencycontactname"
            label="Emergency Contact Name"
            type="text"
            icon={<CiUser />}
            placeholder="Jane Doe"
            register={register}
            error={errors?.emergencycontactname?.message}
            disabled={isSubmitting}
          />
          <Input
            name="emergencycontactnumber"
            label="Emergency Contact Number"
            type="text"
            icon={<BsTelephone />}
            placeholder="+1(xxx) xxx-xxxx"
            register={register}
            error={errors?.emergencycontactnumber?.message}
            disabled={isSubmitting}
          />
        </div>
        <Input
          name="employeeID"
          label="Employee ID"
          type="text"
          icon={<FiLock />}
          placeholder="xxxxxxx"
          register={register}
          error={errors?.employeeID?.message}
          disabled={isSubmitting}
        />
        <div className="my-4">
          <label className="block text-gray-700">Department</label>
          <div className="flex flex-col space-y-2">
            {["Shop Floor", "Client Team", "Control Room", "Inventory", "Management"].map((dept) => (
              <label key={dept} className="inline-flex items-center">
                <input
                  type="radio"
                  
                  value={dept}
                  {...register("role")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">{dept}</span>
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

         <div className="my-4">
          <label className="block text-gray-700">Personal Type</label>
          <div className="flex flex-col space-y-2">
            {["Full Time Employee (FTE)", "Contracted Employee (CTE)"].map((dept) => (
              <label key={dept} className="inline-flex items-center">
                <input
                  type="radio"
                  
                  value={dept}
                  {...register("employeestatus")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">{dept}</span>
              </label>
            ))}
          </div>
          {errors.employeestatus && (
            <p className="text-red-500 text-xs mt-1">
              {errors.employeestatus.message}
            </p>
          )}
        </div>
        <SlideSubmit
          type="submit"
          text="Sign up"
          slide_text="Secure sign up"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default RegisterForm;
