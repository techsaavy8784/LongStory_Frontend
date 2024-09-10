import OrderDetail from "./orderDetail";
import OrderItemList from "./orderItemList";
import { OrderDetail as OrderDetailType } from "@/types/order";

const Order = ({ orderDetail }: { orderDetail: OrderDetailType }) => {
  return (
    <div className="w-[1150px] p-[32px] border border-[#CBD5E1] rounded-[24px] ">
      <OrderDetail orderDetail={orderDetail} />
      <hr className="my-[24px]" />
      <OrderItemList orderItemList={orderDetail.order_items} />
    </div>
  );
};

export default Order;
