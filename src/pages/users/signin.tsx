import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image, { ImageProps } from "next/image";

import Link from "next/link";
import SigninWithPassword from "@/components/auth/signinWithPassword";

const Signin = () => {
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
        <SigninWithPassword />

        <div className="mt-6 text-center">
          <label className="font-light leading-[21px] text-sm">
            Interested in joining us?&nbsp;&nbsp;
          </label>
          <Link
            href="/users/signup"
            style={{ color: "black" }}
            className="hover:font-semibold hover:duration-300 underline underline-offset-4 decoration-1 font-medium leading-[21px] text-sm"
          >
            Apply for membership.
          </Link>
        </div>
        <div className="hover:font-semibold hover:duration-300 text-sm leading-[21px] font-medium underline underline-offset-4 decoration-[0.5px] mt-6 text-center">
          <Link href="/users/forgotPassword">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};
Signin.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default Signin;
