import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { SearchBar } from "@/components/search/searchBar";
import { Products } from "@/components/home/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setSearch } from "@/redux/slices/user/userSlice";
import { useAppDispatch } from "@/types/hooks";
import { Users } from "@/components/search/users";

const PeopleSearch = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      dispatch(setSearch(target.value));
    }
  };
  useEffect(() => {
    dispatch(setSearch(null));
  }, [dispatch]);
  return (
    <div className="w-[1567px] flex">
      <div className="px-8 py-5 w-full fixed">
        <SearchBar filter={"people"} onKeyDown={onKeyDown} />
      </div>
      <div className="mt-[101px] ml-[543.5px]">
        <Users />
      </div>
    </div>
  );
};

PeopleSearch.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default PeopleSearch;
