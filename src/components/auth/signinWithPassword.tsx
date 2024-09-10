import Image, { ImageProps } from "next/image";
import axios from "@/utils/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const SigninWithPassword = () => {
  const { login } = useAuth();
  const [flag, setFlag] = useState(true);

  const emailSchema = yup
    .object({
      email: yup
        .string()
        .required("Please input your Email")
        .email("Invalid Email"),
    })
    .required();

  const passwordSchema = yup
    .object({
      password: yup
        .string()
        .required()
        .min(6, "Must be at least 6 characters")
        .max(20, "Must be less than 20 Characters"),
    })
    .required();

  const schema = emailSchema.concat(passwordSchema);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await login(email, password);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Invalid Email or Password",
      });
    }
  };

  const change_password_type = () => {
    setFlag(!flag);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-6">
        <div className="membership-input ">
          <input
            {...register("email")}
            type="email"
            className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon1 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
            placeholder="Email"
          />
        </div>
        <p className="text-[red] ml-2 mt-2 text-xs">{errors.email?.message}</p>
        <div className="mt-4">
          <div className="membership-input flex">
            <input
              type={flag ? "password" : "text"}
              {...register("password")}
              className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon2 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
              id="input_icon2 "
              placeholder="Password"
            />
          </div>
          <p className="text-[red] ml-2 mt-2 text-xs">
            {errors.password?.message}
          </p>
        </div>
        <div className="membership-link mt-6">
          <button
            type="submit"
            className="w-full rounded-[48px] py-[14px] px-8 bg-black text-white text-base leading-6 hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:duration-300 shutterOutHorizontal"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default SigninWithPassword;
