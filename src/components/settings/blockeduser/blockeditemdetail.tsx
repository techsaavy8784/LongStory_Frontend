import Image from "next/image";
import { BlockedItemProps } from "./blockeditemlist";

const BlockedItemDetail = ({
  blockedItemDetail,
}: {
  blockedItemDetail: BlockedItemProps;
}) => {
  return (
    <>
      <div className="flex items-center gap-6 w-175">
        <div>
          <Image
            src={`../assets/images/users/${blockedItemDetail.userImg}.svg`}
            alt={blockedItemDetail.userName}
            width={64}
            height={64}
            className=""
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <div>
            <div className="text-xl font-semibold">
              {blockedItemDetail.userName}
            </div>
            <div className="text-xs">{blockedItemDetail.productCount}+ Products</div>
          </div>
          <div className="border-1 border-gray-4 rounded-50 px-5 py-4 text-sm font-medium hover:bg-blue-1 hover:text-white cursor-pointer">
            Unblock
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockedItemDetail;
