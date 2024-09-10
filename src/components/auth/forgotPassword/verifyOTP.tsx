import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/utils/axios";
import ChangePassword from "./changePassword";

const VerifyOTP = ({ userEmail }: { userEmail: string }) => {
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setCompleted(false);
    setError(null);
  };

  const handleComplete = (finalValue: string) => {
    setCompleted(true);
  };

  const onChangePassword = async () => {
    try {
      const response = await axios.get("/api/users/account/checkOTP/", {
        params: { otp: value, email: userEmail },
      });
      setOtpVerified(true);
    } catch (err: any) {
      console.log(err.error);
      setError(err?.error);
    }
  };

  return !otpVerified ? (
    <div className="flex flex-col justify-center gap-6 mt-8">
      <div>
        <p className="font-light  mb-2">
          Please Enter the passcode sent to your Email
        </p>
        <div className="flex justify-center items-center gap-3">
          <p className="text-sm leading-[17.64px] font-semibold">
            joeeinhorn@gmail.com
          </p>
          <button className="hover:font-semibold hover:duration-300 text-sm leading-[21px] font-medium underline-offset-4 text-[#14B8A6] underline">
            Change Email
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <MuiOtpInput
            value={value}
            onChange={handleChange}
            onComplete={handleComplete}
            length={4}
            autoFocus
            validateChar={(character: string, index: number) => true}
            display="flex"
            gap={4}
            TextFieldsProps={{ placeholder: "-" }}
            className="flex justify-center w-[356px] px-[42px] gap-4"
          />
        </div>
        <div className="text-center text-red">{error ? error : ""}</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="text-center text-sm leading-[21px] font-medium">
          Didn&apos;t Received the passcode?
          <button className="hover:font-semibold hover:duration-300 text-sm leading-[21px] font-medium underline-offset-4 text-[#14B8A6] underline">
            Resend
          </button>
        </div>
        <button
          className={
            "px-8 py-[14px] w-[356px] text-base text-white font-medium rounded-[48px] " +
            (completed ? "bg-black shutterOutHorizontal" : "bg-[#9ca0a7]")
          }
          onClick={onChangePassword}
          disabled={!completed}
        >
          Change password.
        </button>
      </div>
    </div>
  ) : (
    <ChangePassword userEmail={userEmail} />
  );
};

export default VerifyOTP;
