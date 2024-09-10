import Image from "next/image";
import { ReactNode } from "react";
import { useAppSelector } from "@/types/hooks";
import useAuth from "@/hooks/useAuth";

const ShippingDetail = ({ children }: { children?: ReactNode }) => {
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const { user } = useAuth();
  return (
    <div className="w-full border rounded-[24px] p-6 bg-[#F8FAFC] flex flex-col gap-5 ">
      <div className="flex flex-col gap-6 text-gray-800">
        <div className="flex justify-start items-center gap-4">
          <img
            src={
              user?.avatar_url
                ? user.avatar_url
                : `/assets/images/users/User.svg`
            }
            alt={user && user.username ? user.username : "user"}
            className="rounded-[128px] w-14 h-14"
          />
          <div className="flex flex-col gap-1 justify-start">
            <div className="text-base font-bold ">{user && user.username}</div>
            <div className="text-xs font-normal text-gray-600">
              {user && user.order_count ? user.order_count : 0} Previous Orders
            </div>
          </div>
        </div>

        <div
          className="py-6 border-y-1 border-y-[
#E2E8F0]"
        >
          <div className="flex justify-start gap-2 items-center  ">
            <Image
              src={`/assets/images/Login/emailBox.svg`}
              width={24}
              height={24}
              alt={"emailBox"}
            />
            <div className="text-sm text-gray-600">{user && user.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-6 ">
          <div className="flex justify-start gap-4 p-4">
            <Image
              src={`/assets/images/mybag/address.svg`}
              width={32}
              height={32}
              alt={"emailBox"}
            />
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold">Shipping Address</div>
              <div className="text-sm font-light text-gray-600">
                {pendingOrderDetail &&
                  pendingOrderDetail.shipping_address &&
                  `${pendingOrderDetail.shipping_address.address}, ${pendingOrderDetail.shipping_address.city}, ${pendingOrderDetail.shipping_address.state}, ${pendingOrderDetail.shipping_address.phone}`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-start gap-4 p-4">
            <Image
              src={`/assets/images/mybag/address.svg`}
              width={32}
              height={32}
              alt={"emailBox"}
            />
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold ">Billing Address</div>
              <div className="text-sm font-light text-gray-600">
                {pendingOrderDetail &&
                  pendingOrderDetail.billing_address &&
                  `${pendingOrderDetail.billing_address.address}, ${pendingOrderDetail.billing_address.city}, ${pendingOrderDetail.billing_address.state}, ${pendingOrderDetail.billing_address.phone}`}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-start gap-4 p-4">
            <Image
              src={`/assets/images/mybag/shippingMethod.svg`}
              width={32}
              height={32}
              alt={"emailBox"}
            />
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold">Shipping Method</div>
              <div className="text-sm font-light text-gray-600">
                {"DHL - Takes up to 3 working days"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ShippingDetail;
