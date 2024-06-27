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
    title: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(32, "First name must be less than 32 characters")
,
    question: z
      .string()
      .min(2, "Last name must be at least 2 characters"),
    role: z.enum(["Shop Floor", "Client Team", "Control Room", "Inventory", "Management","All"], {
      required_error: "Department is required",
    }), 
    repeated: z.enum(["Ask Once", "Repeated"], {
      required_error: "Repeated is required",
    }),

    sitelocation: z.enum(["Vehicle Plant", "Battery Plant", "All"], {
      required_error: "Location is required",
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
      const { data } = await axios.post("/api/auth/addquestions", {
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
    
    <div className=" container mx-auto max">
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
            placeholder="Title"
            register={register}
            error={errors?.title?.message}
            disabled={isSubmitting}
          />
        </div>
        <Input
          name="question"
          label="Ask Safety Question"
          type="text"
          icon={<BsTelephone />}
          placeholder="Ask Safety Question"
          register={register}
          error={errors?.question?.message}
          disabled={isSubmitting}
          
        />
      
        <div className="my-4">
          <label className="block text-gray-700">Departments</label>
          <div className="flex flex-col space-y-2">
            {["Shop Floor", "Client Team", "Control Room", "Inventory", "Management","All"].map((dept) => (
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
          <label className="block text-gray-700">Site Location</label>
          <div className="flex flex-col space-y-2">
            {["Vehicle Plant", "Battery Plant", "All"].map((dept) => (
              <label key={dept} className="inline-flex items-center">
                <input
                  type="radio"
                  value={dept}
                  {...register("sitelocation")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">{dept}</span>
              </label>
            ))}
          </div>
          {errors.sitelocation && (
            <p className="text-red-500 text-xs mt-1">
              {errors.sitelocation.message}
            </p>
          )}
        </div>

         <div className="my-4">
          <label className="block text-gray-700">Question Repeated</label>
          <div className="flex flex-col space-y-2">
            {["Ask Once", "Repeated"].map((dept) => (
              <label key={dept} className="inline-flex items-center">
                <input
                  type="radio"
                  
                  value={dept}
                  {...register("repeated")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">{dept}</span>
              </label>
            ))}
          </div>
          {errors.repeated && (
            <p className="text-red-500 text-xs mt-1">
              {errors.repeated.message}
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
