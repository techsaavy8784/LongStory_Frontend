import useAuth from "@/hooks/useAuth";
import axios from "@/utils/axios";
import { useRouter } from "next/router";
export default function ApplicationAccepted({ second }: { second: number }) {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const onJump = async () => {
    try {
      await updateProfile({ auth_status: 6 });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-black-1/20 relative">
        <div className="w-[551.53px] h-[591.36px] absolute left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-[97.79px] text-center left-[224px]">
            <p className="text-sm leading-[21px] text-center font-medium text-[#475569]">
              Greetings
            </p>
            <p className="text-xl text-black leading-[30px] text-center font-semibold">
              {user?.username}
            </p>
          </div>
          <img
            src="/assets/images/payimg/verifyEmail1.png"
            alt="verifyEmail1"
            className="w-full h-full"
          />
          <button
            className="rounded-[48px] bg-black text-white hover:shadow-2xl text-center px-[32px] py-[14px]  z-20 relative left-[180px] top-[-80px] w-[195px] m-auto"
            onClick={onJump}
          >
            Accept Invitation
          </button>
          <div className="flex text-black absolute gap-2 left-[136px] bottom-[139.57px]">
            <div className="w-24 h-24 bg-white rounded-[24px] text-center">
              <p className="pt-[25px] font-extrabold text-[32px] leading-[48px]">
                {Math.floor(second / 3600)}
              </p>
            </div>
            <div className="w-24 h-24 bg-white rounded-[24px] text-center">
              <p className="pt-[25px] font-extralight text-[#475569] text-[32px] leading-[48px]">
                {Math.floor((second - Math.floor(second / 3600) * 3600) / 60)}
              </p>
            </div>
            <div className="w-24 h-24 bg-white rounded-[24px] text-center">
              <p className="pt-[25px] font-extralight text-[32px] text-[#475569] leading-[48px]">
                {Math.floor(second - Math.floor(second / 60) * 60)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
