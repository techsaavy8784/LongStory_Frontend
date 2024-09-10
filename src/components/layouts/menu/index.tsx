import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "./logo";
import MenuItemList from "./menuList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SecondMenu from "./secondMenu";
import {
  SecondMenuDataInterface,
  orderMenuListData,
  settingMenuListData,
} from "./secondMenuData";
import useAuth from "@/hooks/useAuth";
import {
  fetchOrderDetails,
  fetchPendingOrderDetail,
} from "@/redux/slices/order/orderSlice";

export default function Menu({ children }: { children?: ReactNode }) {
  const [small, setSmall] = useState<boolean>(false);
  const { user } = useAuth();
  const [showSecondBar, setShowSecondBar] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    fetchOrderDetails();
    fetchPendingOrderDetail();
    if (
      router.pathname.indexOf("setting") === 1 ||
      router.pathname.indexOf("notification") === 1 ||
      router.pathname.indexOf("order") === 1
    ) {
      setSmall(true);
    } else {
      setSmall(false);
    }
    if (
      router.pathname.indexOf("setting") === 1 ||
      router.pathname.indexOf("order") === 1
    ) {
      setShowSecondBar(true);
    } else {
      setShowSecondBar(false);
    }
  }, [router]);
  return (
    <div className="w-full h-full flex justify-start">
      <div className="flex h-screen fixed top-0 left-0">
        <div className="flex flex-col justify-between p-6 border-r-1">
          <div className={"flex flex-col " + (small ? "gap-24" : "gap-12")}>
            <Logo small={small} />
            <MenuItemList small={small} />
          </div>
          <div className="">
            <Link
              href={"/users/profile"}
              className="px-[8px] py-3 flex justify-start items-center gap-3"
            >
              <img
                src={
                  user?.avatar_url
                    ? user.avatar_url
                    : `/assets/images/users/User.svg`
                }
                alt={"avatar"}
                className={
                  "border-2 rounded-full w-[48px] h-[48px] " +
                  (router.pathname.indexOf("users/profile") === 1
                    ? "border-black"
                    : "border-white")
                }
              />
              {!small && (
                <div
                  className={
                    "text-lg leading-[27px] w-[217px] " +
                    (router.pathname.indexOf("users/profile") === 1
                      ? "font-bold"
                      : "font-normal")
                  }
                >
                  {user?.username}
                </div>
              )}
            </Link>
          </div>
        </div>
        {showSecondBar && (
          <div className="border-r-1 p-6">
            <div className="mt-20">
              <SecondMenu
                secondMenuData={
                  router.pathname.indexOf("setting") === 1
                    ? settingMenuListData
                    : orderMenuListData
                }
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={
          small
            ? router.pathname.indexOf("notification") === 1
              ? "pl-content-2"
              : "pl-content-3"
            : "pl-content-1"
        }
      >
        {children}
      </div>
    </div>
  );
}
