import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import PaymentDetail from "@/components/mybag/payment/paymentDetail";
import OrderSummary from "@/components/mybag/orderSummary/orderSummary";
import AddPaymentLayout from "@/components/layouts/mybag/addPaymentLayout";
import { useRouter } from "next/router";
import PaymentSelection from "@/components/mybag/payment/paymentSelection";
import InputField from "@/components/InputField";

const AddWire = () => {
  const router = useRouter();
  const onSavePaymentMethod = () => {
    router.push("/mybag/payment");
  };
  return (
    <AddPaymentLayout>
      <PaymentSelection methodType={"wire"} />
      <div className="w-[358px] mt-3 flex flex-col gap-8">
        <div className="w-full text-sm font-medium leading-[21px] text-[#0F172A]">
          Please forward the Total Amount to the Bank Listed & Add the
          Transaction ID below to continue
        </div>
        <div className="flex flex-col gap-6 text-base">
          <div className="flex justify-between">
            <span className="text-[#475569] font-light">User Name:</span>
            <span className="text-[#0F172A] font-semibold text-right">
              John Doe
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#475569] font-light">Routing Number:</span>
            <span className="text-[#0F172A] font-semibold text-right">
              123456789
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#475569] font-light">Account Number:</span>
            <span className="text-[#0F172A] font-semibold text-right">
              10987654321
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#475569] font-light">Check Number:</span>
            <span className="text-[#0F172A] font-semibold text-right">
              1111
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#475569] font-light">Address:</span>
            <span className="text-[#0F172A] font-semibold text-right flex flex-col">
              <span>123 Bankrate Boulevard,</span>
              <span>New York, NY 10001</span>
              <span>555-555-5555,</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* <InputField
            label="Enter Transaction ID"
            img={"transaction"}
            placeholder="Enter Transaction ID"
          /> */}
          <button
            className="w-[356px] p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl"
            onClick={onSavePaymentMethod}
          >
            Save Payment Method
          </button>
        </div>
      </div>
    </AddPaymentLayout>
  );
};

AddWire.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddWire;
