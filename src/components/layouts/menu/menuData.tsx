export interface MenuItemDataInterface {
  title: string;
  image: string;
  url: string;
  alarm?: number;
}

export const menuListData: MenuItemDataInterface[] = [
  {
    title: "Home",
    image: "home",
    url: "/",
  },
  {
    title: "Search",
    image: "search",
    url: "/search/product",
  },
  {
    title: "My Bag",
    image: "mybag",
    alarm: 1,
    url: "/mybag",
  },
  {
    title: "Notifications",
    image: "notification",
    alarm: 1,
    url: "/notification",
  },
  {
    title: "Orders",
    image: "order",
    alarm: 5,
    url: "/order/all",
  },
  {
    title: "Settings",
    image: "setting",
    url: "/setting/profileSetting",
  },
  {
    title: "Log Out",
    image: "logout",
    url: "/users/signout",
  },
];
