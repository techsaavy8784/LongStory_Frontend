import { methods, MethodsInterface } from "@/components/mybag/payment/payment";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const payments: Array<keyof MethodsInterface> = ["card", "paypal"];
const PaymentSelection = ({
  methodType,
}: {
  methodType: keyof MethodsInterface;
}) => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] =
    useState<keyof MethodsInterface>(methodType);
  const onSelectedMethodChange = (e: any) => {
    router.push(`/setting/billing/addPayment/${e.target.value}`);
  };
  return (
    <div className="flex justify-start items-center gap-8">
      {payments.map((method, index) => {
        return (
          <div
            className={
              "flex justify-start gap-2 " +
              (selectedMethod === method ? "opacity-100" : "opacity-40")
            }
            key={index}
          >
            <input
              type="radio"
              id={method}
              name="payment"
              value={method}
              checked={method === selectedMethod}
              onChange={onSelectedMethodChange}
            />
            <label
              htmlFor={method}
              className="flex flex-start items-center gap-2"
            >
              <Image
                src={`/assets/images/bill/${method}.svg`}
                width={methods[method].width}
                height={methods[method].height}
                alt={method}
              />
              <span className="leading-[20.16px] font-semibold text-[#0F172A]">
                {methods[method].title}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default PaymentSelection;
