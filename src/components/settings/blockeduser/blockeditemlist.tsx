import BlockedItemDetail from "./blockeditemdetail";

export interface BlockedItemProps {
  userImg: string;
  userName: string;
  productCount: number;
}

export const blockedUserListMock: BlockedItemProps[] = [
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user3Img",
    userName: "Talan Donin",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
];

export default function BlockedItemList() {
  return (
    <>
      <div className="flex flex-col gap-6 p-14">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold text-gray-4">
            People that you have blocked
          </div>
          <hr />
        </div>
        {blockedUserListMock.map((item, index) => {
          return (
            <div className="flex flex-col gap-8" key={index}>
              <BlockedItemDetail blockedItemDetail={item} />
            </div>
          );
        })}
      </div>
    </>
  );
}
