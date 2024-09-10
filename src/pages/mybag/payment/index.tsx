import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import PaymentDetail from "@/components/mybag/payment/paymentDetail";
import OrderSummary from "@/components/mybag/orderSummary/orderSummary";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/types/hooks";
import { updatePendingOrderDetail } from "@/redux/slices/order/orderSlice";

const PaymentPage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  console.log(pendingOrderDetail);
  const onProceed = (arg1: string) => {
    updatePendingOrderDetail({
      order_detail_id: pendingOrderDetail?.id,
      payment_id: selected,
    });
    router.push("/mybag/checkout");
  };
  const onSelected = (selected_id: number | undefined) => {
    setSelected(selected_id);
  };

  useEffect(() => {
    if (pendingOrderDetail && pendingOrderDetail.payment && !selected) {
      setSelected(pendingOrderDetail.payment.id);
    }
  }, [pendingOrderDetail, selected]);

  return (
    <MybagLayout step={2}>
      <div className="flex justify-between">
        <PaymentDetail onSelected={onSelected} selected={selected} />
        <OrderSummary
          onProceed={onProceed}
          buttonValue="Proceed with Payment"
          disableButton={!selected}
        />
      </div>
    </MybagLayout>
  );
};

PaymentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default PaymentPage;
