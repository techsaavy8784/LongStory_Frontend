import Image from "next/image";
import { NotificationProps } from "./type-context";

export function NotificationPersonal({
  history,
  status,
  userName,
  userImg,
  content,
  productName,
  date,
}: NotificationProps) {
  return (
    <>
      <div className="pt-2 pb-4 flex flex-col gap-2">
        <div className="flex flex-start items-start gap-4 py-2 ">
          <div className="relative w-10 h-10">
            <Image
              src={`../assets/images/users/${userImg}.svg`}
              alt={userImg}
              width={40}
              height={40}
            />
            {history === "recent" && (
              <div className="absolute -top-2 left-2 w-2 h-2 border-1 bg-opacity-40 bg-rose-400 border-red rounded-full"></div>
            )}
          </div>
          <div className="text-sm w-[249px]">
            <span className="font-bold">{userName} </span>
            <span className="text-[#475569]">{content} </span>
            <span className="font-bold">{productName}</span>
          </div>
        </div>
        {status === "pending" && (
          <div className="flex justify-start gap-2 pl-16">
            <button className="px-4 py-2 text-[12px] rounded-[48px] leading-[18px] text-white bg-black hover:shadow-xl">
              Accept
            </button>
            <button className="px-4 py-2 text-[12px] rounded-[48px] leading-[18px] border-1 border-[#CBD5E1] text-black bg-white hover:shadow-xl">
              Reject
            </button>
          </div>
        )}
        <div className="text-[12px] leading-5 text-[#64748B] text-left pl-14">
          {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}{" "}
          {date.getHours()} : {date.getMinutes()}
        </div>
      </div>
    </>
  );
}
