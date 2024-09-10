import Image, { ImageProps } from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import MinimalLayout from "@/components/layouts/minimallayout";

const Logout = () => {
  const { login, logout } = useAuth();
  const [flag, setFlag] = useState(true);
  const router = useRouter();
  useEffect(() => {
    logout();
  }, []);

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
      router.push("/");
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
    <MinimalLayout>
      <div className="bg-white border-t-1 border-black w-full h-[197px] fixed bottom-0 flex flex-col justify-center items-center gap-6">
        <Link
          href={"/users/signup"}
          className="text-center font-semibold text-sm leading-[21px] underline"
        >
          Apply for memebership
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-center items-start gap-4">
            <div className="flex flex-col">
              <div className="membership-input w-[358px]">
                <input
                  {...register("email")}
                  type="email"
                  className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon2 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
                  placeholder="Enter your email address"
                />
              </div>
              <p className="text-[red] ml-2 mt-2 text-xs">
                {errors.email?.message}
              </p>
            </div>
            <div className="w-[358px] flex flex-col">
              <div className="membership-input display-flex">
                <input
                  type={flag ? "password" : "text"}
                  {...register("password")}
                  className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon2 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
                  id="input_icon2"
                  placeholder="Enter your Password"
                />

                {/* <a
                  className="membership-input-eye"
                  onClick={change_password_type}
                >
                  <Image src={flag ? eyeLogo : EyeSlash} alt="" />
                </a> */}
              </div>
              <p className="text-[red] ml-2 mt-2 text-xs">
                {errors.password?.message}
              </p>
            </div>
            <div className="w-[107px]">
              <button
                type="submit"
                className="rounded-[48px] py-[14px] px-8 bg-black text-white text-base leading-6 hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:duration-300 shutterOutHorizontal"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </MinimalLayout>
  );
};

export default Logout;
