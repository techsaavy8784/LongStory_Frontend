import Image from "next/image";
import { OrderItem } from "@/types/order";
import { useState } from "react";
import { Variant } from "@/types/product";

const OrderItemList = ({ orderItemList }: { orderItemList: OrderItem[] }) => {
  return (
    <div className="w-[1086px]">
      <table className="w-full text-left">
        <thead>
          <tr className="font-medium text-sm">
            <th>Product</th>
            <th>Shipping Method</th>
            <th>Price Per Unit</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderItemList.map((orderItem, index) => {
            let variant: Variant | undefined = undefined;
            let imgUrl: string = "/assets/images/users/User.svg";
            if (
              orderItem.product.variants &&
              orderItem.product.variants.length > 0
            ) {
              const filteredVariant = orderItem.product.variants.filter(
                (variant) => variant.index === 1
              );
              if (
                filteredVariant.length > 0 &&
                filteredVariant[0].media.length > 0
              ) {
                imgUrl = filteredVariant[0].media.filter(
                  (mediaItem) => mediaItem.index === 1
                )[0].url;
              }
              if (filteredVariant.length > 0) {
                variant = filteredVariant[0];
              }
            }
            return (
              <tr
                key={index}
                className={
                  "my-4 " +
                  (index === orderItemList.length - 1 ? "" : "border-b")
                }
              >
                <td className="py-4">
                  <div className="flex justify-start items-center gap-4">
                    <img
                      src={imgUrl}
                      alt={orderItem.product.name}
                      className="rounded-3xl w-16 h-16"
                    />
                    <p>{orderItem.product.name}</p>
                  </div>
                </td>
                <td>{"Pick Up"}</td>
                <td className="font-bold">
                  {Math.floor(
                    variant && variant.inventory && variant.inventory.price
                      ? variant.inventory.price
                      : 0
                  ).toLocaleString("en-US")}
                </td>
                <td className="font-bold">{orderItem.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItemList;
