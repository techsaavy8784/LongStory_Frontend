import Image from "next/image";
import Link from "next/link";
import { MenuItemDataInterface } from "./menuData";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/types/hooks";

const MenuItem = ({
  menuItemData,
  small,
}: {
  menuItemData: MenuItemDataInterface;
  small: boolean;
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [alarm, setAlarm] = useState<number>(0);
  const router = useRouter();
  const orderDetails = useAppSelector((state) => state.order.orderDetails);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  useEffect(() => {
    if (menuItemData.url === "/") {
      setSelected(router.pathname === "/" || router.pathname === "");
    } else if (menuItemData.url !== "/users/signout") {
      setSelected(
        router.pathname.indexOf(menuItemData.url.split("/")[1]) === 1
      );
    }
  }, [router, menuItemData.url]);

  useEffect(() => {
    let alarm1: number = 0;
    if (menuItemData.title === "My Bag") {
      if (
        pendingOrderDetail?.order_items &&
        pendingOrderDetail.order_items.length > 0
      ) {
        alarm1 = pendingOrderDetail.order_items.length;
      }
    }
    if (menuItemData.title === "Orders") {
      if (orderDetails && orderDetails.length > 0) {
        alarm1 = orderDetails.length;
      }
    }
    if (menuItemData.title === "Notifications") {
      alarm1 = 15;
    }
    setAlarm(alarm1);
  }, [pendingOrderDetail?.order_items, orderDetails, menuItemData.title]);
  return (
    <Link
      href={menuItemData.url}
      className={
        "relative px-[14px] py-3 flex items-center gap-3 text-base text-gray-80 hover:bg-gray-100 " +
        (selected ? "font-bold bg-gray-100" : "font-normal")
      }
    >
      <Image
        src={`/assets/images/menu/${menuItemData.image}.svg`}
        alt={menuItemData.image}
        width={32}
        height={32}
      />
      <div className={small ? "hidden" : "w-[233px] gap-3 flex"}>
        <div>{menuItemData.title}</div>
        {menuItemData.alarm && alarm > 0 && (
          <div className="w-6 h-6 text-xs leading-4 font-semibold text-[#059669] bg-[#ECFDF5] rounded-full flex justify-center items-center">
            <p>{`${alarm > 9 ? "" : "0"}${alarm}`}</p>
          </div>
        )}
      </div>
      {small && menuItemData.alarm && alarm > 0 && (
        <div className="w-6 h-6 text-xs leading-4 font-semibold text-[#059669] bg-[#ECFDF5] rounded-full flex justify-center items-center absolute bottom-0 right-0">
          <p>{`${alarm > 9 ? "" : "0"}${alarm}`}</p>
        </div>
      )}
    </Link>
  );
};

export default MenuItem;
