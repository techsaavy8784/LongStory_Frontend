import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Order from "@/components/order/order";
import { useAppSelector } from "@/types/hooks";

const Pending = () => {
  const orderDetails = useAppSelector((state) => state.order.orderDetails);
  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">All Orders</div>
      <div className="p-8 space-y-8">
        {orderDetails
          .filter((orderDetail) => orderDetail.order_status === "pending")
          .map((orderDetail, index) => {
            return <Order key={index} orderDetail={orderDetail} />;
          })}
      </div>
    </div>
  );
};

Pending.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default Pending;
