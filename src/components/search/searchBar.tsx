import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export function SearchBar({
  filter,
  onKeyDown,
}: {
  filter: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleFilter = (value: string) => {
    router.push(`/search/${value}`);
  };

  return (
    <>
      <div className="flex rounded-50 bg-gray-2 justify-start  items-center pl-6 py-[6px] pr-[6px] w-[480px] gap-3">
        <Image
          src={`../assets/images/home-icon/search.svg`}
          alt={"search"}
          width={24}
          height={24}
        />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={`Search ${filter}`}
          onKeyDown={onKeyDown}
          className="outline-none text-base font-semibold bg-gray-2 w-52"
        />
        <div className="flex justify-center items-center gap-3 bg-white p-1 rounded-50">
          {filter == "product" ? (
            <div className="flex">
              <button className="px-5 py-[10px] rounded-50 bg-gray-900 text-white text-sm leading-[21px]">
                Product
              </button>
              <button
                className="px-5 py-[10px] rounded-50  text-gray-3 text-sm leading-[21px]"
                onClick={() => {
                  handleFilter("people");
                }}
              >
                People
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                className="px-5 py-[10px] rounded-50  text-[#64748B] text-sm leading-[21px]"
                onClick={() => {
                  handleFilter("product");
                }}
              >
                Product
              </button>
              <button className="px-5 py-[10px] rounded-50  bg-gray-900 text-white text-sm leading-[21px]">
                People
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
