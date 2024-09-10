import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/types/hooks";
import { useState } from "react";

interface OrderSummaryPropsInterface {
  onProceed: (arg1: string) => void;
  buttonValue: string;
  disableButton?: boolean;
  children?: ReactNode;
}
const OrderSummary = ({
  onProceed,
  buttonValue,
  children,
  disableButton = false,
}: OrderSummaryPropsInterface) => {
  const [total, setTotal] = useState(0);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  useEffect(() => {
    let totalPrice: number = 0;
    if (pendingOrderDetail) {
      pendingOrderDetail.order_items.forEach((orderItem, index) => {
        if (
          orderItem.product.variants.length > 0 &&
          orderItem.product.variants[0].inventory &&
          orderItem.product.variants[0].inventory.price
        )
          totalPrice +=
            orderItem.product.variants[0].inventory.price * orderItem.quantity;
      });
    }
    setTotal(totalPrice);
  }, [pendingOrderDetail]);
  return (
    <div className="w-[422px] h-[724px] rounded-[24px] p-8 bg-[#F8FAFC] flex flex-col justify-between ">
      <div className="flex flex-col gap-6">
        <div className="text-2xl font-semibold">Order Summary</div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="text-xl font-normal">Total Item Cost</div>
            <div className="text-xl font-light">{`$${total}`}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-normal">Saved</div>
            <div className="text-xl font-light">{`$${0}`}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xl font-normal">Shipping</div>
            <div className="text-xl font-light">{`$${100}`}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {children && children}
        <div className="flex justify-between text-2xl font-semibold">
          <div>Total</div>
          <div>${Math.floor(total + 100).toLocaleString("en-US")}</div>
        </div>
        <button
          className={
            "text-white text-base font-normal p-5 rounded-[48px] " +
            (disableButton ? "bg-[#9ca0a7]" : "bg-gray-900 hover:shadow-xl ")
          }
          onClick={() => onProceed(buttonValue)}
          disabled={disableButton}
        >
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
