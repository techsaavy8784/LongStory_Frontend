export interface NotificationProps {
  history: "recent" | "earlier"; //is recent or not
  status: "pending" | "active" | "deactivated";
  userName: string;
  userImg: string;
  productName: string;
  content: string;
  date: Date;
}

export const notificationList: NotificationProps[] = [
  {
    history: "recent",
    status: "pending",
    userName: "David Kent",
    userImg: "user2Img",
    content: "requested to follow your product",
    productName: "Running Sport Shoes",
    date: new Date(2023, 9, 1, 15, 45),
  },
  {
    history: "recent",
    status: "active",
    userName: "Ray Arnold & 6 others",
    userImg: "user3Img",
    content: "liked your shoes that we’re posted by",
    productName: "Running Sport Shoes",
    date: new Date(2023, 9, 2, 12, 28),
  },
];

export const notificationList2: NotificationProps[] = [
  {
    history: "earlier",
    status: "active",
    userName: "Dennis Nedry",
    userImg: "user5Img",
    content: "accepted your private request to follow her account",
    productName: "",
    date: new Date(2023, 9, 5, 12, 45),
  },
  {
    history: "earlier",
    status: "active",
    userName: "Hi David,",
    userImg: "user4Img",
    content:
      "your order (1234567890) is successful & will be delivered within 2 working days, you’ll receive it by. ",
    productName: "31st August",
    date: new Date(2023, 9, 1, 12, 45),
  },
  {
    history: "earlier",
    status: "active",
    userName: "Dennis Nedry",
    userImg: "user5Img",
    content: "accepted your private request to follow her account",
    productName: "",
    date: new Date(2023, 9, 5, 12, 45),
  },
];
