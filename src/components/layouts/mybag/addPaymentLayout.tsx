import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import AddPayment from "@/components/mybag/payment/addPayment";
import OrderSummary from "@/components/mybag/orderSummary/orderSummary";

import { useRouter } from "next/router";
import { ReactNode } from "react";

const AddPaymentLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const onProceed = (arg1: string) => {
    router.push("/mybag/checkout");
  };
  return (
    <MybagLayout step={2}>
      <div className="flex justify-between">
        <AddPayment>{children}</AddPayment>
        <OrderSummary
          onProceed={onProceed}
          buttonValue="Proceed with Payment"
          disableButton={true}
        />
      </div>
    </MybagLayout>
  );
};

export default AddPaymentLayout;
