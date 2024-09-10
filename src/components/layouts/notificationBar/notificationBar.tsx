import SortBar from "@/components/home/sortBar";
import { NotificationPersonal } from "./notificationPersonal";
import { notificationList, notificationList2 } from "./type-context";
import { Products } from "@/components/home/products";

export function NotificationBar() {
  const notificationBarList = notificationList;
  const notificationBarList2 = notificationList2;
  return (
    <div className="pt-24 px-6 w-content-1 h-full fixed border-r-1 border-gray-3 ">
      <div className="h-full w-full">
        <div className="text-2xl font-semibold">Notifications</div>
        <div className="pt-12">
          {notificationBarList.map((item, index) => (
            <NotificationPersonal {...item} key={index} />
          ))}
        </div>
        <div className="text-[18px] leading-[27px] mt-2">Earlier</div>
        <hr className="mt-3 mb-2" />
        <div>
          {notificationBarList2.map((item, index) => (
            <NotificationPersonal {...item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
