import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const AddPaymentLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">
        Billing & Shipping Info
      </div>
      <div className="p-16 flex flex-col gap-12 w-[876px]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between pb-4 border-b-1 border-[#CBD5E1]">
            <span className="text-lg leading-[27px] font-semibold">
              Add payment method
            </span>
          </div>
          <div className="flex flex-col gap-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentLayout;
