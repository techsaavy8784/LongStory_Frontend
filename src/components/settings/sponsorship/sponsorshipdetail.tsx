import Image from "next/image";
import { SponsorShipItemProps } from "./sponsorshiplist";
import TriggerBtn from "./trigerbtn";

const SponsorShipDetail = ({
  sponsorShipDetail,
}: {
  sponsorShipDetail: SponsorShipItemProps;
}) => {
  return (
    <>
      <div className="flex items-center gap-6 w-175">
        <div>
          <Image
            src={`../assets/images/users/${sponsorShipDetail.userImg}.svg`}
            alt={sponsorShipDetail.userName}
            width={64}
            height={64}
            className=""
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <div>
            <div className="text-xl font-semibold">
              {sponsorShipDetail.userName}
            </div>
            <div className="text-xs">
              {sponsorShipDetail.productCount}+ Products
            </div>
          </div>
          <div className="flex gap-12">
            <div className="flex gap-5 items-center">
              <div className="text-xs text-black">Monthly Subscription</div>
              <TriggerBtn status={true} />
            </div>
            <div className="flex gap-5 items-center">
              <div className="text-xs text-black">Orders</div>
              <TriggerBtn status={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorShipDetail;
