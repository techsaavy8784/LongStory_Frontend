import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { useAppSelector } from "@/types/hooks";

const OrderSummary = () => {
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
    <div className="w-[468.5px] h-[291px] border rounded-[24px] p-6 bg-[#F8FAFC] flex flex-col gap-8">
      <div className="text-xl font-semibold">Order Summary</div>
      <div className="flex flex-col gap-5 text-lg">
        <div className="flex justify-between">
          <div className="font-normal">Total Item Cost</div>
          <div className="font-light">{`$${Math.floor(total).toLocaleString(
            "en-US"
          )}`}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-normal">Saved</div>
          <div className="font-light">{`$${0}`}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-normal">Shipping</div>
          <div className="font-light">{`$${100}`}</div>
        </div>
      </div>
      <div className="flex justify-between text-xl font-semibold">
        <div>Total</div>
        <div>{Math.floor(total + 0 + 100).toLocaleString("en-US")}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
