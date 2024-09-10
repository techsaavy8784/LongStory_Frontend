import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image, { ImageProps } from "next/image";
import axios from "@/utils/axios";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const SubmitApplication = () => {
  const router = useRouter();
  const { updateProfile } = useAuth();
  // testing start
  const onJump = async () => {
    try {
      await updateProfile({ auth_status: 4 });
    } catch (err) {
      console.log(err);
    }
  }; // testing end

  return (
    <div className="w-full h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center gap-6">
      <Image
        src={"/assets/images/home-icon/EyeSlash.svg"}
        alt={"eyeslash"}
        width={72}
        height={72}
      />
      <div className="text-center text-white">
        <p className="font-bold text-[32px] leading-[44.8px]">
          Cool Stuff Ahead!
        </p>
        <p className="font-medium text-base shadow-2xl">
          Some people may find this site addictive.
        </p>
      </div>
      <button
        className="w-[385px] px-8 py-[14px] rounded-[48px] text-white bg-[#10B981] hover:shadow-xl"
        onClick={onJump}
      >
        Submit Application
      </button>
    </div>
  );
};

export default SubmitApplication;
