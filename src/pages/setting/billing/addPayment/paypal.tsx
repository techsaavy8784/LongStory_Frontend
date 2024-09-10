import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import AddPaymentLayout from "@/components/settings/billing/addPaymentLayout";

import { useRouter } from "next/router";
import PaymentSelection from "@/components/settings/billing/paymentSelection";
import { Payment as PaymentType } from "@/types/user";
import { addPayment } from "@/redux/slices/user/paymentSlice";
import useAuth from "@/hooks/useAuth";

const AddPaypal = () => {
  const router = useRouter();

  const { user } = useAuth();

  const onSavePaymentMethod = () => {
    const payment: PaymentType = {
      method: "paypal",
      provider: user?.email as string,
      name: user?.username,
    };
    try {
      addPayment(payment);
      router.push("/setting/billing");
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <AddPaymentLayout>
      <PaymentSelection methodType={"paypal"} />

      <button
        className="w-[356px] mt-3 p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl"
        onClick={onSavePaymentMethod}
      >
        Connect Paypal
      </button>
    </AddPaymentLayout>
  );
};

AddPaypal.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddPaypal;
