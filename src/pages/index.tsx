import SortBar from "@/components/home/sortBar";
import { Products } from "@/components/home/products";
import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { useState, useEffect } from "react";
import { setCategory } from "@/redux/slices/product/productSlice";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import Loading from "@/components/loading";

export default function Home() {
  const category_id = useAppSelector((state) => state.product.category_id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCategory(1));
  }, []);
  return (
    <div className="flex">
      <div className="fixed w-full">
        <SortBar />
      </div>
      <div className="mt-[124px] ml-[332px]">
        {category_id ? <Products /> : <Loading />}
      </div>
    </div>
  );
}
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};
