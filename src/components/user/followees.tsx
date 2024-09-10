import Image from "next/image";
import { useAppSelector } from "@/types/hooks";
import Followee from "./followee";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "@/constants";
const Followees = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const { p, followee, search } = router.query;

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    let url = "/users/profile?followee=true&p=" + page;
    if (search) {
      url += `&search=${search}`;
    }
    router.push(url, undefined, {
      shallow: true,
    });
  };
  const followees = useAppSelector((state) => state.follow.followees);

  const followees_count = useAppSelector(
    (state) => state.follow.followees_count
  );

  const onClose = () => {
    router.push(`/users/profile`);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const onSearchChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(searchInput, target.value);
    if (e.key === "Enter" && search !== target.value) {
      let url = "/users/profile?followee=true&p=1";
      if (target.value !== "") {
        url += `&search=${target.value}`;
      }
      router.push(url, undefined, {
        shallow: true,
      });
    }
  };

  useEffect(() => {
    setSearchInput(search ? (search as string) : "");
  }, [followee, p, search]);
  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-white bg-opacity-80 flex justify-center items-center z-20">
      <div className="w-[540px] flex flex-col p-8 gap-6 bg-white border-1 border-[#CBD5E1] rounded-[18px]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <span className="text-[24px] leading-9 font-semibold">
              Following
            </span>
            <button
              className=" hover:shadow-xl hover:bg-gray-200 hover:text-white"
              onClick={onClose}
            >
              <span className="w-6 h-6 p-[6px] text-gray-700 flex justify-center items-center">
                <Image
                  src={`/assets/images/close.png`}
                  width={12}
                  height={12}
                  alt="close"
                />
              </span>
            </button>
          </div>
          <span className="text-[14px] leading-[21px] font-medium text-[#475569]">
            The people you follow
          </span>
        </div>
        <div className="relative ">
          <input
            id="search"
            type="text"
            className="w-full pl-5 py-4 pr-14 bg-[#F1F5F9] rounded-[18px] outline-1 outline-gray-400 text-base"
            placeholder="Search"
            onChange={onInputChange}
            onKeyDown={onSearchChange}
            value={searchInput}
          />
          <button className="bg-[#475569] rounded-full absolute top-[18px] right-[28px]">
            <label
              htmlFor="search"
              className="w-5 h-5   text-white flex justify-center items-center"
            >
              <Image
                src={`/assets/images/close.png`}
                width={6}
                height={6}
                alt="close"
                className="invert"
              />
            </label>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {followees.map((followee, index) => {
            return <Followee follow={followee} key={index} />;
          })}
          {followees.length === 0 && <div>There are no user you follow</div>}
        </div>
        <div className="flex justify-center items-center">
          <Stack spacing={2}>
            {/* <Pagination count={10} shape="rounded" /> */}
            <Pagination
              count={
                followees ? Math.ceil(followees_count / PAGE_SIZE.follow) : 1
              }
              page={p ? Number(p) : 1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Followees;
