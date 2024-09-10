import Image from "next/image";

const IdVerification2 = ({ onStep2 }: { onStep2: () => void }) => {
  return (
    <div className="m-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-[420px] py-10 px-8 gap-6 border border-[#CBD5E1] rounded-[18px] bg-white">
        <div>
          <Image
            src={"/assets/images/Login/Logo_file.svg"}
            alt="logo"
            width={94}
            height={96}
            className="m-auto"
          />
        </div>
        <div className="font-semibold text-2xl leading-[32.4px] mt-6 text-center ">
          <p>Identify Verification</p>
        </div>
        <div className="font-light text-base leading-6 mt-6 text-center mb-4">
          <p>
            Please upload the <span className="font-semibold">BACK</span> of
            your ID or NIC.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-[356px] h-[128px] border-1 border-dashed border-[#94A3B8] rounded-[18px] flex flex-col justify-center items-center gap-2">
            <Image
              src={"/assets/images/Login/UploadSimple.svg"}
              alt="search"
              width={32}
              height={33}
            />
            <div className="text-base font-semibold text-center">
              Upload a Picture
            </div>
          </div>
          <div className="w-[356px] h-[128px] border-1 border-dashed border-[#94A3B8] rounded-[18px] flex flex-col justify-center items-center gap-2">
            <Image
              src={"/assets/images/Login/cameraIcon.svg"}
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
            onClick={onStep2}
            className="w-full rounded-[48px] py-[14px] px-8 bg-black text-white text-base leading-6 shutterOutHorizontal"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdVerification2;
