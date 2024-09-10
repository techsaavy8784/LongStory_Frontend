import { SortItem } from "../../types/common";

export function SortBarItem({ title, active, onclick }: SortItem) {
  return (
    <>
      {active ? (
        <div
          className="text-f16 bg-black text-white font-bold py-3 px-4 rounded-10 cursor-pointer"
          onClick={onclick}
        >
          {title}
        </div>
      ) : (
        <div
          className="text-f16 py-3 px-4 text-black-1 cursor-pointer hover:bg-gray-200 rounded-10"
          onClick={onclick}
        >
          {title}
        </div>
      )}
    </>
  );
}
