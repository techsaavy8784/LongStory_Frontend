import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import { useRouter } from "next/router";
import Products from "@/components/mybag/checkout/products";
import OrderSummary from "@/components/mybag/checkout/orderSummary";
import PaymentDetail from "@/components/mybag/checkout/paymentDetail";
import ShippingDetail from "@/components/mybag/checkout/shippingDetail";
import { Payment } from "@/types/user";
import { useAppSelector } from "@/types/hooks";
import { updatePendingOrderDetail } from "@/redux/slices/order/orderSlice";

const Checkout = () => {
  const router = useRouter();
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );

  const onConfirmOrder = (arg1: string) => {
    updatePendingOrderDetail({
      order_detail_id: pendingOrderDetail?.id,
      order_status: "confirmed",
    });

    router.push("/order/all");
  };
  const onEditDetails = (arg1: string) => {
    console.log(arg1);
    router.push("/mybag/shipping");
  };

  return (
    <MybagLayout step={3}>
      <div className="flex justify-between">
        <div className="w-[953px] flex flex-col gap-8">
          <Products />
          <div className="w-full flex justify-between gap-4">
            <OrderSummary />
            <PaymentDetail />
          </div>
        </div>
        <div className="w-[422px]">
          <ShippingDetail>
            <button
              className={
                "w-full p-5 rounded-[48px] border-1 border-black text-black text-base font-normal leading-4 font-sans hover:shadow-xl"
              }
              onClick={() => onEditDetails("onEditDetails")}
            >
              {"Edit"}
            </button>
            <button
              className={
                "w-full p-5 rounded-[48px] border-1 text-white text-base font-normal leading-4 font-sans bg-gray-900 hover:shadow-xl "
              }
              onClick={() => onConfirmOrder("onConfirmOrder")}
            >
              {"Confirm Order"}
            </button>
          </ShippingDetail>
        </div>
      </div>
    </MybagLayout>
  );
};

Checkout.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default Checkout;
