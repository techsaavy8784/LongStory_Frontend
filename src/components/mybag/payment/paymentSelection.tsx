import { methods, MethodsInterface } from "./payment";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const payments: Array<keyof MethodsInterface> = [
  "masterCard",
  "visa",
  "paypal",
  "applepay",
  "wire",
];
const PaymentSelection = ({
  methodType,
}: {
  methodType: keyof MethodsInterface;
}) => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] =
    useState<keyof MethodsInterface>(methodType);
  const onSelectedMethodChange = (e: any) => {
    // setSelectedMethod(e.target.value);
    router.push(`/mybag/payment/${e.target.value}`);
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
            <label htmlFor={method}>
              <Image
                src={`/assets/images/bill/${method}.svg`}
                width={methods[method].width}
                height={methods[method].height}
                alt={method}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default PaymentSelection;
