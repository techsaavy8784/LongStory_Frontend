import { OrderDetail } from "@/types/order";
import { useEffect, useState } from "react";
const totalPrice: number = 50000;
const OrderDetail = ({ orderDetail }: { orderDetail: OrderDetail }) => {
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    //add fuction to get total
  }, []);
  return (
    <div className="w-[1086px] flex flex-col gap-2">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-center items-center gap-5">
          <div className="font-semibold text-xl">
            Order ID: #{orderDetail.id}
          </div>
          <div className="text-[#065F46] border border-[#6EE7B7] bg-[#ECFDF5] hover:bg-[#6EE7B7] rounded-50 text-[12px] px-4 py-2">
            {orderDetail.order_status}
          </div>
        </div>
        <div className="inline-block font-semibold text-xl flex col-4 justify-start items-center gap-4">
          <span>{totalPrice.toLocaleString("en-US")}</span>
          <div className="inline-block">
            Total Items: <strong>{orderDetail.order_items.length}</strong>
          </div>
          <button className="px-4 py-3 border-1 border-[#E2E8F0] text-[12px] leading-[18px] hover:shadow-xl rounded-[48px]">
            Cancel Order
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between ">
        {/* <div className="flex justify-center items-center gap-5"> */}
        <span>
          Placed on: <strong>{"09-26-2023"}</strong>
        </span>
        <span>
          Arrive in: <strong>{"today"}</strong>
        </span>
        {/* </div> */}
      </div>
    </div>
  );
};

export default OrderDetail;
