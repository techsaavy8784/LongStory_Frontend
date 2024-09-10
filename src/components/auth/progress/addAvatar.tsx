import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useState, useRef } from "react";
import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";

const AddAvatar = () => {
  const [file, setFile] = useState<File | null>();
  const { user, updateProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const onContinue = async () => {
    if (file) {
      await updateProfile({ auth_status: 2, file });
    }
  };
  const onAddAvatar = () => {
    fileRef.current?.click();
  };
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
        <input
          type="file"
          className="hidden"
          name="files"
          ref={fileRef}
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <div className="flex justify-center items-center">
          <div className="flex w-[226px] items-center mt-6 gap-4 justify-start pl-">
            <div className="w-25 h-25 bg-[#F1F5F9] rounded-full flex justify-center items-center  ">
              {!file ? (
                <p className="m-auto font-extrabold text-[40px] leading-[60px]">
                  {user?.username &&
                    user?.username.split(" ").map((item, index) => {
                      return (
                        <span key={index}>
                          {item.slice(0, 1).toLocaleUpperCase()}
                        </span>
                      );
                    })}
                </p>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt="avatar"
                  className="w-[100px] h-[100px] rounded-full"
                />
              )}
            </div>
            <div className="text-xl leading-[30px] break-all font-semibold  w-[110px]">
              {user?.username}
            </div>
          </div>
        </div>
        <div className="font-light text-base leading-6 mt-6 text-center mb-4">
          <p>Upload or take a new pic for your profile.</p>
        </div>
        <div className="flex gap-2 justify-between">
          <button
            className="w-[174px] h-[128px] border-1 border-dashed border-[#94A3B8] rounded-[18px] flex flex-col justify-center items-center gap-2"
            onClick={onAddAvatar}
          >
            <Image
              src={"/assets/images/Login/UploadSimple.svg"}
              alt="search"
              width={32}
              height={33}
            />
            <div className="text-base font-semibold text-center">
              Upload a Picture
            </div>
          </button>
          <div className="w-[174px] h-[128px] border-1 border-dashed border-[#94A3B8] rounded-[18px] flex flex-col justify-center items-center gap-2">
            <Image
              src={"assets/images/Login/cameraIcon.svg"}
              alt="cameraicon"
              width={32}
              height={33}
            />
            <div className="text-base font-semibold text-center">
              Take a Picture
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={onContinue}
            disabled={!file}
            className={
              "w-full rounded-[48px] py-[14px] px-8  text-white text-base leading-6 " +
              (file ? "bg-black shutterOutHorizontal" : "bg-[#9ca0a7]")
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAvatar;
