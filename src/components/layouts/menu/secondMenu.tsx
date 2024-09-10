import { SecondMenuDataInterface } from "./secondMenuData";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SecondMenu = ({
  secondMenuData,
}: {
  secondMenuData: SecondMenuDataInterface[];
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-2xl leading-6 font-semibold mb-12">
        {secondMenuData[0].url.indexOf("setting") >= 0 ? "Setting" : "Order"}
      </div>
      <div className="text-base text-gray-800 flex flex-col gap-4">
        {secondMenuData.map((secondMenuItemData, index) => {
          const selected = router.pathname.indexOf(secondMenuItemData.url) >= 0;
          return (
            <button
              className={
                "p-4 rounded-[16px] w-[305px] hover:bg-[#F1F5F9] text-left " +
                (selected ? "bg-[#F1F5F9] text-bold" : "")
              }
              key={index}
              onClick={() => {
                router.push(secondMenuItemData.url);
              }}
            >
              {secondMenuItemData.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SecondMenu;
