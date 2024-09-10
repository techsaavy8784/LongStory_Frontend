export interface SecondMenuDataInterface {
  title: string;
  url: string;
}

export const orderMenuListData: SecondMenuDataInterface[] = [
  {
    title: "All Orders",
    url: "/order/all",
  },
  {
    title: "Pending",
    url: "/order/pending",
  },
  {
    title: "Confirmed",
    url: "/order/confirmed",
  },
  {
    title: "On It's way",
    url: "/order/onway",
  },
  {
    title: "Delivered",
    url: "/order/delivered",
  },
  {
    title: "Cancelled",
    url: "/order/cancelled",
  },
];

export const settingMenuListData: SecondMenuDataInterface[] = [
  {
    title: "Profile Settings",
    url: "/setting/profileSetting",
  },
  {
    title: "Billing & Shipping Info",
    url: "/setting/billing",
  },
  {
    title: "Liked Items",
    url: "/setting/likedItems",
  },
  {
    title: "Blocked Users",
    url: "/setting/blockedUsers",
  },
  {
    title: "Sponsorship ",
    url: "/setting/sponsorship",
  },
];
