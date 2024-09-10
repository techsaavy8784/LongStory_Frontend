import { useState, useEffect } from "react";
import { useAppSelector } from "./redux";

const useAlarm = (title: string) => {
  const [alarm1, setAlarm1] = useState(0);
  const orderDetails = useAppSelector((state) => state.order.orderDetails);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  useEffect(() => {
    let alarm: number = 0;
    if (title === "My Bag") {
      if (
        pendingOrderDetail?.order_items &&
        pendingOrderDetail.order_items.length > 0
      ) {
        alarm = pendingOrderDetail.order_items.length;
      }
    }
    if (title === "Order") {
      if (orderDetails && orderDetails.length > 0) {
        alarm = orderDetails.length;
      }
    }
    if (title === "Notifications") {
      alarm = 15;
    }
    setAlarm1(alarm);
  }, [title, orderDetails, pendingOrderDetail?.order_items]);

  return [title];
};

export default useAlarm;
