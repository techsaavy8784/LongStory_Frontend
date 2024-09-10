import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import ShippingDetail from "@/components/mybag/shipping/shippingDetail";
import OrderSummary from "@/components/mybag/orderSummary/orderSummary";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/types/hooks";
import { updatePendingOrderDetail } from "@/redux/slices/order/orderSlice";

const ShippingPage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const onProceed = (arg1: string) => {
    updatePendingOrderDetail({
      order_detail_id: pendingOrderDetail?.id,
      billing_address_id: selected,
      shipping_address_id: selected,
    });
    router.push("/mybag/payment");
  };
  const onSelected = (selected_id: number | undefined) => {
    setSelected(selected_id);
  };
  useEffect(() => {
    if (pendingOrderDetail && pendingOrderDetail.billing_address && !selected) {
      setSelected(pendingOrderDetail.billing_address.id);
    }
  }, [pendingOrderDetail, selected]);
  return (
    <MybagLayout step={1}>
      <div className="flex justify-between">
        <ShippingDetail onSelected={onSelected} selected={selected} />
        <OrderSummary
          onProceed={onProceed}
          buttonValue="Proceed with Shipping details"
          disableButton={!selected}
        />
      </div>
    </MybagLayout>
  );
};

ShippingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default ShippingPage;
