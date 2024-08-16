"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsSchema, formValues } from "@/Schema/zodSchema";
import axios from "axios";

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    resolver: zodResolver(contactUsSchema),
  });

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    try {
      const res = await axios.post("/api/contact-us", data);
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      alert("Something went wrong" + (error as any).response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-4 text-4xl">ContactUs</h1>
        <div className="flex mb-4 bg-slate-500 w-4/5 md:w-3/4 lg:w-1/2  rounded-lg justify-center items-center p-4">
          <form
            className="flex flex-col  mb-4 w-full justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Name Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full  sm:w-3/4 p-4">
              <label htmlFor="name" className="text-white">
                Name:
              </label>
              <div className="w-full sm:w-2/3 gap-y-2 justify-center flex flex-col">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="p-2 w-full  border border-gray-300 rounded-md"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p role="alert" className="text-teal-400 bg-black">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full  sm:w-3/4 p-4">
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <div className="w-full sm:w-2/3 gap-y-2 justify-center  flex flex-col">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="p-2 w-full  border border-gray-300 rounded-md"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p role="alert" className="text-teal-400 bg-black">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full  sm:w-3/4 p-4">
              <label htmlFor="phone" className="text-white">
                Phone:
              </label>
              <div className="w-full sm:w-2/3 gap-y-2 justify-center  flex flex-col">
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone"
                  className="p-2 w-full border border-gray-300 rounded-md"
                  aria-invalid={errors.phone ? "true" : "false"}
                  maxLength={10}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.slice(0, 10);
                  }}
                />
                {errors.phone && (
                  <p role="alert" className="text-teal-400 bg-black">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full  sm:w-3/4 p-4">
              <label htmlFor="message" className="text-white">
                Message:
              </label>
              <div className="w-full sm:w-2/3 gap-y-2 justify-center flex flex-col">
                <textarea
                  {...register("message")}
                  className="p-2 w-full  min-h-48 border border-gray-300 rounded-md"
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p role="alert" className="text-teal-400 bg-black">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="bg-teal-500 text-white p-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
