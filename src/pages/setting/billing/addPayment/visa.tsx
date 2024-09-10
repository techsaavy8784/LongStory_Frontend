import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import AddPaymentLayout from "@/components/settings/billing/addPaymentLayout";

import { useRouter } from "next/router";
import PaymentSelection from "@/components/settings/billing/paymentSelection";
import InputField from "@/components/InputField";

const AddVisaCard = () => {
  const router = useRouter();
  const onSavePaymentMethod = () => {
    router.push("/setting/billing");
  };
  return (
    <AddPaymentLayout>
      <PaymentSelection methodType={"visa"} />
      <div className="flex flex-col gap-4">
        {/* <InputField
          label="Name of Card"
          img="name"
          placeholder="Enter full name"
        />
        <InputField
          label="Card Number"
          img="card"
          placeholder="Enter 14 digit card number"
        />
        <InputField
          label="Expiry Date"
          img="date"
          placeholder="Enter expiry date"
        />
        <InputField
          label="CVC"
          img="password"
          placeholder="Enter 3 digits code"
        /> */}
      </div>
      <button
        className="w-[356px] p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl"
        onClick={onSavePaymentMethod}
      >
        Save Payment Method
      </button>
    </AddPaymentLayout>
  );
};

AddVisaCard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddVisaCard;
