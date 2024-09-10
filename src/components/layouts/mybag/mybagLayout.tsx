import StepBar from "@/components/common/stepBar";
import { ReactNode } from "react";
const stepBarItemList: string[] = [
  "Order Summary",
  "Shipping Details",
  "Payment Details",
  "Checkout",
];
const MybagLayout = ({
  children,
  step,
}: {
  children: ReactNode;
  step: number;
}) => {
  return (
    <div className="flex flex-col gap-[44px] h-full">
      <div className="px-8 py-5 text-2xl font-bold">My Bags</div>
      <div className="pl-20">
        <div className="w-[1407px] flex flex-col gap-8">
          <div className="flex justify-start items-center py-6 gap-12">
            <StepBar step={step} stepBarItemList={stepBarItemList}>
              <hr className="w-[132px]" />
            </StepBar>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MybagLayout;
