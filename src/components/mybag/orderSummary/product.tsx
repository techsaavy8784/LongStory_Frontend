import Image from "next/image";
import { useState, useEffect } from "react";
import { OrderItem } from "@/types/order";
import {
  removeProductFromOrder,
  changeQuantity,
} from "@/redux/slices/order/orderSlice";
import { Variant } from "@/types/product";
const selections = ["1", "2", "3", "4", "5"];
const Product = ({ orderItem }: { orderItem: OrderItem }) => {
  const [imgUrl, setImgUrl] = useState<string>("/assets/images/users/User.svg");
  const [variant, setVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(
    orderItem.quantity ? orderItem.quantity : 1
  );
  const onSelectChange = (e: any) => {
    setQuantity(e.target.value);
    changeQuantity(orderItem.id, e.target.value);
  };
  const onRemove = () => {
    removeProductFromOrder(orderItem.id);
  };
  useEffect(() => {
    if (orderItem.product.variants && orderItem.product.variants.length > 0) {
      const filteredVariant = orderItem.product.variants.filter(
        (variant) => variant.index === 1
      );
      if (filteredVariant.length > 0 && filteredVariant[0].media.length > 0) {
        setImgUrl(
          filteredVariant[0].media.filter(
            (mediaItem) => mediaItem.index === 1
          )[0].url
        );
      }
      if (filteredVariant.length > 0) {
        setVariant(filteredVariant[0]);
      }
    }
  }, [orderItem.product.variants]);
  return (
    <div className="flex justify-start gap-6">
      <img
        src={imgUrl}
        alt={"product3Img"}
        className="rounded-[20px] w-[172px] h-[172px]"
      />
      <div className="flex justify-start items-center gap-4 py-[12.78px]">
        <div className="w-[483px] flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-semibold">{orderItem.product.name}</p>
          </div>
          <div className="flex justify-start gap-4 text-base font-medium">
            <button className="text-gray-900 underline">
              Add to favorites
            </button>
            <button className="text-[#EF4444] underline" onClick={onRemove}>
              Remove
            </button>
          </div>
        </div>
        <div>
          <select
            name="quantity"
            id=""
            className="px-2 py-[10px] w-[78px] border-r-8 border-transparent rounded-[48px] outline outline-1 outline-gray-300 text-base font-semibold "
            onChange={onSelectChange}
            value={quantity}
          >
            {selections.map((selection, index) => {
              return (
                <option value={selection} key={index}>
                  0{selection}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-[148px] text-right text-2xl font-light">
          $
          {Math.floor(
            variant && variant.inventory && variant.inventory.price
              ? variant.inventory.price
              : 0
          ).toLocaleString("en-US")}
        </div>
      </div>
    </div>
  );
};

export default Product;
