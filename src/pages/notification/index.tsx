import { NotificationBar } from "@/components/layouts/notificationBar/notificationBar";
import { LAYOUT } from "@/constants";
import Layout from "@/components/layouts/layout";
import SortBar from "@/components/home/sortBar";
import { Products } from "@/components/home/products";
import { setCategory } from "@/redux/slices/product/productSlice";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import Loading from "@/components/loading";
import { useEffect } from "react";

export default function Notification() {
  const category_id = useAppSelector((state) => state.product.category_id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCategory(1));
  }, []);
  return (
    <>
      <div className="flex">
        <NotificationBar />
        <div className="pl-content-1 flex">
          <div className="fixed w-full">
            <SortBar />
          </div>
          <div className="mt-[124px] ml-[332px]">
            {category_id ? <Products /> : <Loading />}
          </div>
        </div>
      </div>
    </>
  );
}
Notification.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};
