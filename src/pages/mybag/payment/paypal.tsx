import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import AddPaymentLayout from "@/components/layouts/mybag/addPaymentLayout";

import { useRouter } from "next/router";
import PaymentSelection from "@/components/mybag/payment/paymentSelection";

const AddPaypal = () => {
  const router = useRouter();
  const onSavePaymentMethod = () => {
    router.push("/mybag/payment");
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
