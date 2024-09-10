import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image, { ImageProps } from "next/image";
import axios from "@/utils/axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VerifyOTP from "@/components/auth/forgotPassword/verifyOTP";

const ForgotPassword = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const onSend: () => void = () => {
    router.push("/users/changePassword");
  };

  const schema = yup
    .object({
      email: yup
        .string()
        .required("* Please input your Email")
        .email("Invalid Email"),
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
  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const response = await axios.get("/api/users/account/forgotPassword/", {
        params: { email },
      });
      setUserEmail(email);
    } catch (err: any) {
      setError("email", {
        type: "manual",
        message: err?.error,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-white px-8 py-10 flex flex-col justify-center rounded-[18px] border-1 border-[#CBD5E1] w-[420px]">
        <div className="flex justify-center">
          <Image
            src={"/assets/images/Login/Logo_file.svg"}
            width={93.83}
            height={96}
            alt={"logo"}
          />
        </div>
        {!userEmail ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col justify-center gap-6 mt-6">
              <div>
                <InputField
                  control={control}
                  img="email"
                  name="email"
                  placeholder="Email"
                  className=""
                />
                {errors.email?.message && (
                  <p className="text-red mt-2">{errors.email?.message}</p>
                )}
              </div>
              <button
                className="px-8 py-[14px] w-[356px] text-base text-white font-medium bg-black rounded-[48px] shutterOutHorizontal"
                type="submit"
              >
                Send OTP.
              </button>
            </div>
          </form>
        ) : (
          <VerifyOTP userEmail={userEmail} />
        )}
      </div>
    </div>
  );
};
ForgotPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default ForgotPassword;
