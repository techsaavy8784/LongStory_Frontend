import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuth from "@/hooks/useAuth";

const SignupWithPassword = () => {
  const { register } = useAuth();
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Please input your Email")
        .email("Invalid Email"),
      username: yup.string().required("Please input your name"),
      password: yup
        .string()
        .required()
        .min(6, "Must be at least 6 characters")
        .max(20, "Must be less than 20 Characters"),
    })
    .required();

  const {
    register: reg,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      await register(email, password, username);
    } catch (err: any) {
      if (err && err?.email) {
        setError("email", {
          type: "manual",
          message: err?.email,
        });
      }
      if (err && err?.username) {
        setError("username", {
          type: "manual",
          message: err?.username,
        });
      }
      if (err && err?.password) {
        setError("password", {
          type: "manual",
          message: err?.password,
        });
      }
      if (err && err?.success !== "100") {
        setError("email", {
          type: "manual",
          message: "Net error",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-6">
        <div className="membership-input ">
          <input
            type="text"
            className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-username w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
            placeholder="Name"
            {...reg("username")}
          />
        </div>
        <p className="text-[red] ml-2 mt-2 text-xs">
          {errors.username?.message}
        </p>
        <div className="membership-input mt-4">
          <input
            {...reg("email")}
            type="email"
            className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon1 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
            placeholder="Email"
          />
        </div>
        <p className="text-[red] ml-2 mt-2 text-xs">{errors.email?.message}</p>
      </div>

      <div className="mt-4">
        <div className="membership-input display-flex">
          <input
            {...reg("password")}
            className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 input-icon2 w-full h-14 rounded-[14px] py-4 px-[18px] border border-[#CBD5E1] gap-3 text-sm leading-[17.64px]"
            id="input_icon2"
            placeholder="Password"
            type={"password"}
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
          Continue
        </button>
      </div>
    </form>
  );
};
export default SignupWithPassword;
