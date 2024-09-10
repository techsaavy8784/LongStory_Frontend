import Image from "next/image";

const IdVerification3 = ({ onStep3 }: { onStep3: () => void }) => {
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
        <div className="font-semibold text-2xl leading-[32.4px] mt-6 text-center">
          <p>Complete application</p>
        </div>
        <div className="gap-4 flex flex-col mt-6">
          <div>
            <input
              type="url"
              className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 font-normal text-sm w-full h-14 rounded-14 border border-[#CBD5E1] px-[18px] py-[19px] leading-[17.64px]"
              placeholder="https:// Link to your Wikipedia or Linkedin"
            />
          </div>
          <div>
            <input
              type="url"
              className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 font-normal text-sm w-full h-14 rounded-14 border border-[#CBD5E1] px-[18px] py-[19px] leading-[17.64px]"
              placeholder="https:// Link to your Tiktok or Instagram"
            />
          </div>
          <div>
            <textarea
              className="hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 font-normal text-sm w-full h-[142px] rounded-14 border border-[#CBD5E1] px-4 py-5 leading-[17.64px]"
              placeholder="Anything else to share about yourself goes here."
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={onStep3}
            className="w-full rounded-[48px] py-[14px] px-8 bg-black text-white text-base leading-6 shutterOutHorizontal"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdVerification3;
