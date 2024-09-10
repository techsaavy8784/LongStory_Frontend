import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { SearchBar } from "@/components/search/searchBar";
import { Products } from "@/components/home/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCategory, setSearch } from "@/redux/slices/product/productSlice";
import { useAppDispatch } from "@/types/hooks";

const ProductSearch = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement

    if (e.key === "Enter") {
      // 👇 Get input value
      dispatch(setSearch(target.value));
    }
  };
  useEffect(() => {
    dispatch(setCategory(null));
  }, [dispatch]);
  return (
    <div className="w-[1567px] flex">
      <div className="px-8 py-5 w-full fixed">
        <SearchBar filter={"product"} onKeyDown={onKeyDown} />
      </div>
      <div className="mt-[124px] ml-[322px]">
        <Products />
      </div>
    </div>
  );
};

ProductSearch.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default ProductSearch;
