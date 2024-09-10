import { ReactNode } from "react";
const MybagOrderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-[44px] h-full">
      <div className="px-8 py-5 text-2xl font-bold">Order Summary</div>
      <div className="pl-20">
        <div className="w-[1407px] flex gap-8">{children}</div>
      </div>
    </div>
  );
};

export default MybagOrderLayout;
