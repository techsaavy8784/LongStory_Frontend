import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image from "next/image";
import MybagLayout from "@/components/layouts/mybag/mybagLayout";
import Products from "@/components/mybag/orderSummary/products";
import OrderSummary from "@/components/mybag/orderSummary/orderSummary";
import { useRouter } from "next/router";
import { useAppSelector } from "@/types/hooks";
import { useEffect, useState } from "react";

const OrderSummaryPage = () => {
  const router = useRouter();
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const onProceed = (arg1: string) => {
    router.push("/mybag/shipping");
  };
  useEffect(() => {
    if (pendingOrderDetail && pendingOrderDetail.order_items.length > 0) {
      setCanProceed(true);
    }
  }, [pendingOrderDetail]);
  return (
    <MybagLayout step={0}>
      <div className="flex justify-between">
        <Products />
        <OrderSummary
          onProceed={onProceed}
          buttonValue="Confirm Shipment Details"
          disableButton={!canProceed}
        >
          <div className="text-base font-normal text-black">
            Had a special token, you can add here
          </div>
          <div
            className="w-full h-[57px] pt-2 pr-2 pb-2 pl-5 rounded-[88px] border border-[
#CBD5E1] bg-white flex justify-between items-center gap-3 hover:border-black"
          >
            <div className="w-[225px] flex justify-between items-center">
              <Image
                src={"/assets/images/mybag/Frame.svg"}
                width={32}
                height={32}
                alt={"Frame"}
              />
              <input
                type="text"
                placeholder="Enter token number"
                className="text-sm w-[184px] outline-none"
              />
            </div>
            <button className="bg-gray-900 text-white text-sm font-normal px-5 py-[10px] rounded-[48px]">
              Validate
            </button>
          </div>
        </OrderSummary>
      </div>
    </MybagLayout>
  );
};

OrderSummaryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default OrderSummaryPage;
