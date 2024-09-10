import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Address from "@/components/settings/billing/address";
import Payment from "@/components/settings/billing/payment";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { fetchAddresses } from "@/redux/slices/user/addressSlice";
import { fetchPayments } from "@/redux/slices/user/paymentSlice";
import { useEffect } from "react";

const Billing = () => {
  const router = useRouter();
  const addresses = useAppSelector((state) => state.address.addresses);
  const payments = useAppSelector((state) => state.payment.payments);

  const onAddPayment = () => {
    router.push("/setting/billing/addPayment/card");
  };
  const onAddAddress = () => {
    router.push("/setting/billing/addAddress");
  };
  useEffect(() => {
    fetchAddresses();
    fetchPayments();
  }, []);
  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">
        Billing & Shipping Info
      </div>
      <div className="p-16 flex flex-col gap-12 w-[876px]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between pb-4 border-b-1 border-[#CBD5E1]">
            <span className="text-lg leading-[27px] font-semibold">
              Shipping address
            </span>
            <button
              className="leading-[21px] text-[#0F172A] underline hover:text-blue-500"
              onClick={onAddAddress}
            >
              Add shipping address
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {addresses.map((address, index) => {
              return (
                <Address
                  key={index}
                  address={address}
                  defaultAddress={address.is_default}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between pb-4 border-b-1 border-[#CBD5E1]">
            <span className="text-lg leading-[27px] font-semibold">
              Connected Payment Methods
            </span>
            <button
              className="leading-[21px] text-[#0F172A] underline hover:text-blue-500"
              onClick={onAddPayment}
            >
              Add payment method
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {payments.map((payment, index) => {
              return <Payment key={index} payment={payment} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Billing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default Billing;
