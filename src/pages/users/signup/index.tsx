import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image, { ImageProps } from "next/image";

import Link from "next/link";
import SignupWithPassword from "@/components/auth/signupWithPassword";

const Signup = () => {
  return (
    <div className="m-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-[420px] py-10 px-8 gap-6 border border-[#CBD5E1] rounded-[18px] bg-white">
        <div className="">
          <Image
            src={"/assets/images/Login/Logo_file.svg"}
            alt="logo"
            width={94}
            height={96}
            className="m-auto"
          />
        </div>
        <div className="text-center font-semibold text-2xl leading-[32.4px] mt-6">
          <p>Apply for membership</p>
        </div>

        <SignupWithPassword />
        <div className="mt-6 text-center">
          <label htmlFor="" className="font-light text-base">
            Already have an account?&nbsp;&nbsp;
          </label>
          <Link
            href="/users/signin"
            style={{ color: "black" }}
            className="hover:font-semibold hover:duration-300 underline font-medium decoration-1 underline-offset-4"
          >
            Login.
          </Link>
        </div>
      </div>
    </div>
  );
};
Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default Signup;
