import Payment from "./payment";
import { ReactNode } from "react";

const AddPayment = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-[937px]">
      <div className="mb-12">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <div className="text-lg font-semibold">Payment Methods</div>
            <div className="text-sm font-normal text-[#0F172A]">
              Please add a new payment gateway
            </div>
          </div>
        </div>
        <hr className="border-gray-100" />
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
};

export default AddPayment;
