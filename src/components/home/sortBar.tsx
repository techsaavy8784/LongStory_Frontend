import { useState, useEffect } from "react";
import { SortBarItem } from "./sortBarItem";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import {
  getCategories,
  setPage,
  setCategory,
} from "@/redux/slices/product/productSlice";
import { Category } from "@/types/product";
import Loading from "../loading";

export default function SortBar() {
  const categories = useAppSelector((state) => state.product.categories);
  const dispatch = useAppDispatch();

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isSortBarVisible, setIsSortBarVisible] = useState(false);

  const handleSortBarItemClick = (clickedIndex: number) => {
    if (categories && selectedTitle !== categories[clickedIndex].name) {
      setSelectedTitle(categories[clickedIndex].name);
      dispatch(setCategory(categories[clickedIndex].id));
    }
    setIsSortBarVisible(false);
  };

  const handleSelectedTitleClick = () => {
    setIsSortBarVisible(!isSortBarVisible);
  };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <>
      {categories && categories.length > 0 ? (
        <div>
          <div
            className="font-bold text-2xl flex justify-start gap-2 items-center w-full cursor-pointer px-8 py-5 "
            onClick={handleSelectedTitleClick}
          >
            <div className="text-2xl leading-9">
              {selectedTitle ? selectedTitle : categories[0].name}
            </div>
            <div>
              {isSortBarVisible ? (
                <Image
                  src={"/assets/images/home-icon/uparrow.svg"}
                  alt="upArrow"
                  width={24}
                  height={24}
                ></Image>
              ) : (
                <Image
                  src={"/assets/images/home-icon/downarrow.svg"}
                  alt="downArrow"
                  width={24}
                  height={24}
                ></Image>
              )}
            </div>
          </div>
          <div className="px-6">
            {isSortBarVisible && (
              <div className="bg-white shadow-lg w-65 px-2 py-1 rounded-10 border-gray-300 border-1 border-t-0 ">
                {categories.map((item, index) => (
                  <SortBarItem
                    title={item.name}
                    active={item.name === selectedTitle}
                    key={index}
                    onclick={() => handleSortBarItemClick(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
