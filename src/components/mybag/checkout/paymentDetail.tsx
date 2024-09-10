import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { Payment } from "@/types/user";
import { useAppSelector } from "@/types/hooks";
import { methods } from "../payment/payment";

const PaymentDetail = () => {
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const [payment, setPayment] = useState<Payment>();
  useEffect(() => {
    if (pendingOrderDetail) {
      if (pendingOrderDetail.payment) {
        setPayment(pendingOrderDetail.payment);
      }
    }
  }, [pendingOrderDetail]);

  return payment && payment.method ? (
    <div className="w-[468.5px] h-[291px] border rounded-[24px] p-6 bg-[#F8FAFC] flex flex-col justify-between">
      <div className="text-xl font-semibold">Payment Details</div>
      <div className="flex flex-col justify-start gap-6 text-lg">
        <div className="flex justify-between">
          <div className="font-normal">Payment Method</div>
          <div className="font-light flex justify-start gap-[10px]">
            <Image
              src={`/assets/images/bill/${payment.method}.svg`}
              width={methods[payment.method].width}
              height={methods[payment.method].height}
              alt={payment.method}
            />
            <div>{methods[payment.method].name}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-normal">
            {methods[payment.method].name} ending with
          </div>
          <div className="font-light">
            ****
            {payment.provider.slice(
              -methods[payment.method].countOfShowingLetters
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-normal">Status</div>
          <div className="font-light">
            {payment.status ? payment.status : "active"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-normal">Transaction</div>
          <div className="font-bold">{pendingOrderDetail?.order_status}</div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default PaymentDetail;
