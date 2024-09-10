import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import AddPaymentLayout from "@/components/settings/billing/addPaymentLayout";

import { useRouter } from "next/router";
import PaymentSelection from "@/components/settings/billing/paymentSelection";

const AddApplepay = () => {
  const router = useRouter();
  const onSavePaymentMethod = () => {
    router.push("/setting/billing");
  };
  return (
    <AddPaymentLayout>
      <PaymentSelection methodType={"applepay"} />

      <button
        className="w-[356px] mt-3 p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl"
        onClick={onSavePaymentMethod}
      >
        Connect Apple Pay
      </button>
    </AddPaymentLayout>
  );
};

AddApplepay.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddApplepay;
