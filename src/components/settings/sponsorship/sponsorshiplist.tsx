import SponsorShipDetail from "./sponsorshipdetail";

export interface SponsorShipItemProps {
  userImg: string;
  userName: string;
  productCount: number;
}

export const sponsorShipListMock: SponsorShipItemProps[] = [
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user4Img",
    userName: "Talan Donin",
    productCount: 200,
  },
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
  {
    userImg: "user2Img",
    userName: "Alfredo Mango",
    productCount: 200,
  },
];

export default function SponsorShipList() {
  return (
    <>
      <div className="flex flex-col gap-6 p-14">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center ">
            <div>
              <div className="text-xl font-semibold text-gray-4">
                People you sponsor
              </div>
              <div className="text-base text-gray-4">
                You can sponsor your friends & relatives
              </div>
            </div>
            <div className="px-5 py-4 rounded-50 text-white border-1 border-gray-4 bg-blue-1 hover:shadow-xl cursor-pointer text-sm">
              New
            </div>
          </div>
          <hr />
        </div>
        {sponsorShipListMock.map((item, index) => {
          return (
            <div className="flex flex-col gap-8" key={index}>
              <SponsorShipDetail sponsorShipDetail={item} />
            </div>
          );
        })}
      </div>
    </>
  );
}
