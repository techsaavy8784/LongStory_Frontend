import Payment from "./payment";
import { Payment as PaymentType } from "@/types/user";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/types/hooks";
import { updatePendingOrderDetail } from "@/redux/slices/order/orderSlice";
import { fetchPayments } from "@/redux/slices/user/paymentSlice";
const PaymentDetail = ({
  onSelected,
  selected,
}: {
  onSelected: (select_id: number | undefined) => void;
  selected: number | undefined;
}) => {
  const router = useRouter();
  const payments = useAppSelector((state) => state.payment.payments);

  const onChangeSelection = (e: any) => {
    onSelected(Number(e.target.value));
  };
  // const onAddPayment = () => {
  //   router.push("/setting/billing/addAddress");
  // };
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="w-[937px]">
      <div className="mb-12">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <div className="text-lg font-semibold">Payment Methods</div>
            <div className="text-sm font-normal text-[#0F172A]">
              Please select the default payment gateway
            </div>
          </div>
          <button
            className="text-sm font-semibold underline hover:text-blue-600"
            onClick={() => router.push("/setting/billing/addPayment/card")}
          >
            Add payment method
          </button>
        </div>
        <hr className="border-gray-100" />
      </div>
      <div className="flex flex-col gap-4">
        {payments.map((payment, index) => {
          return (
            <Payment
              key={index}
              payment={payment}
              changeSelection={onChangeSelection}
              selected={selected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PaymentDetail;
