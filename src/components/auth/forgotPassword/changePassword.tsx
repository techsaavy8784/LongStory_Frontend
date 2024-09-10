import Image, { ImageProps } from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "@/utils/axios";

const ChangePassword = ({ userEmail }: { userEmail: string }) => {
  const router = useRouter();
  const schema = yup
    .object({
      password: yup
        .string()
        .required()
        .min(6, "Must be at least 6 characters")
        .max(20, "Must be less than 20 Characters"),
      passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({
    password,
    passwordConfirmation,
  }: {
    password: string;
    passwordConfirmation: string;
  }) => {
    try {
      const response = await axios.put("/api/users/account/changePassword/", {
        email: userEmail,
        password,
      });
      console.log(response.data);
      router.push("/users/passwordChanged");
    } catch (err: any) {
      setError("password", {
        type: "manual",
        message: err?.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col justify-center gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <div>
            <InputField
              control={control}
              img="password"
              name="password"
              placeholder="Password"
              className=""
              type="password"
            />
            {errors.password?.message && (
              <p className="text-red mt-2">{errors.password?.message}</p>
            )}
          </div>
          <div>
            <InputField
              control={control}
              img="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              className=""
              type="password"
            />
            {errors.passwordConfirmation?.message && (
              <p className="text-red mt-2">
                {errors.passwordConfirmation?.message}
              </p>
            )}
          </div>
        </div>
        <button className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 px-8 py-[14px] gap-[10px] w-[356px] text-base text-white font-medium bg-black rounded-[48px] shutterOutHorizontal">
          Confirm password.
        </button>
      </div>
    </form>
  );
};
export default ChangePassword;
