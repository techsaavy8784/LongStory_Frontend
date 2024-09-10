import Image, { ImageProps } from "next/image";
import axios from "@/utils/axios";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Activate = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [recend, setRecend] = useState(false);
  const onEmailRecend = async () => {
    try {
      const response = await axios.post("/api/users/resend-activation-mail/", {
        email,
      });
      setRecend(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div className="m-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-[420px] py-10 px-8 gap-6 border border-[#CBD5E1] rounded-[18px] bg-white">
        <div className="">
          <Image
            src={"/assets/images/Login/Logo_file.svg"}
            alt="logo"
            width={93.83}
            height={96}
            className="m-auto"
          />
        </div>
        <div className="mt-6 text-center">
          <p className="font-semibold text-2xl leading-[32.4px]">
            Long Story Short
          </p>
        </div>

        <div className="font-light text-base leading-6 mt-6 text-center">
          <p>We&apos;ve {recend ? "recend" : "send"} you an email. </p>
          <p>Click the link inside to continue</p>
        </div>
        <div className="mt-6 text-center">
          <label htmlFor="" className="font-light text-base ">
            Didn&apos;t Receive the Link?&nbsp;&nbsp;
          </label>
          <button
            onClick={onEmailRecend}
            className="text-[#14B8A6] underline font-semibold"
            disabled={!email}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activate;
