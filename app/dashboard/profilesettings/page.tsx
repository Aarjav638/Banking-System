"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdate, profileUpdateValues } from "@/Schema/zodSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      router.push("/");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        id: parsedUser.userWithoutPassword.id,
        name: parsedUser.userWithoutPassword.name,
      });
    } else {
      alert("Something went wrong. User not found.");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileUpdateValues>({
    resolver: zodResolver(profileUpdate),
  });

  const onSubmit: SubmitHandler<profileUpdateValues> = async (data) => {
    try {
      const res = await axios.post("/api/auth/update", {
        ...data,
        id: user?.id,
      });
      alert(res.data.message);
      router.push("/dashboard");
    } catch (error) {
      alert("Something went wrong: " + (error as any).response.data.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <h1 className="my-4 text-4xl">Profile Settings</h1>
      <div className="flex flex-col mb-4 bg-slate-500 w-4/5 md:w-3/4 lg:w-1/2 rounded-lg justify-center items-center p-4">
        <p className="text-teal-300 text-sm font-bold">
          You can update your profile here. Please note that you can&apos;t
          update your name here.
        </p>
        <form
          className="flex flex-col mb-4 w-full justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full sm:w-3/4 p-4">
            <label htmlFor="name" className="text-white">
              Name:
            </label>
            <div className="w-full sm:w-2/3 flex flex-col">
              <input
                value={user?.name || ""}
                type="text"
                placeholder="Name"
                className="p-2 w-full border border-gray-300 rounded-md"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full sm:w-3/4 p-4">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <div className="w-full sm:w-2/3 flex flex-col">
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="p-2 w-full border border-gray-300 rounded-md"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p role="alert" className="text-teal-400 bg-black">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full sm:w-3/4 p-4">
            <label htmlFor="phone" className="text-white">
              Phone:
            </label>
            <div className="w-full sm:w-2/3 flex flex-col">
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

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full sm:w-3/4 p-4">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <div className="w-full sm:w-2/3 flex flex-col">
              <input
                {...register("password")}
                className="p-2 w-full border border-gray-300 rounded-md"
                type="password"
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p role="alert" className="text-teal-400 bg-black">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            className="bg-teal-500 text-white p-2 rounded-md"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
