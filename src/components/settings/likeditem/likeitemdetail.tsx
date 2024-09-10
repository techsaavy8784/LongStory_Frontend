import Image from "next/image";
import Link from "next/link";
import { Like } from "@/types/product";
import { useEffect, useState } from "react";
import { deleteLike } from "@/redux/slices/user/likeSlice";
import { Variant } from "@/types/product";
import { addProductToOrder } from "@/redux/slices/order/orderSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/types/hooks";

const LikedItemDetail = ({ like }: { like: Like }) => {
  const [imgUrl, setImgUrl] = useState<string>("/assets/images/users/User.svg");
  const [canAdd, setCanAdd] = useState<boolean>(true);
  const [variant, setVariant] = useState<Variant | null>(null);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const router = useRouter();
  const onRemoveLike = () => {
    deleteLike(like.product.id);
    // console.log("remvoe");
  };
  const onAddProductToOrder = () => {
    addProductToOrder(like.product.id);
  };

  const onBuy = () => {
    router.push("/mybag/");
  };
  useEffect(() => {
    if (like.product.variants && like.product.variants.length > 0) {
      const filteredVariant = like.product.variants.filter(
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
  }, [like.product.variants]);
  useEffect(() => {
    let flag: boolean = true;
    if (pendingOrderDetail && pendingOrderDetail.order_items.length > 0) {
      flag =
        pendingOrderDetail.order_items.filter(
          (orderItem) => orderItem.product.id === like.product.id
        ).length === 0;
    }
    setCanAdd(flag);
  }, [pendingOrderDetail?.order_items]);
  return (
    <>
      <div className="flex items-center gap-6 w-225">
        <div>
          <img
            src={imgUrl}
            alt={like.product.name}
            className="rounded-3xl w-[92px] h-[92px]"
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex gap-12 items-center">
            <div className="w-60">
              <div className="text-xl font-semibold">{like.product.name}</div>
              <button
                className="text-rose-600 underline hover:text-shadow-lg text-base"
                onClick={onRemoveLike}
              >
                Remove from liked
              </button>
            </div>
            <div className="text-xl font-semibold">
              $
              {Math.floor(
                variant && variant.inventory && variant.inventory.price
                  ? variant.inventory.price
                  : 0
              ).toLocaleString("en-US")}
            </div>
          </div>
          <div>
            {variant &&
            variant.inventory &&
            variant.inventory.quantity &&
            variant.inventory.quantity > 0 ? (
              <div className="flex gap-2">
                <button
                  className={
                    "text-sm px-5 py-3 rounded-50 border-1 border-[#E2E8F0] " +
                    (canAdd ? "hover:shadow-xl" : "opacity-60")
                  }
                  onClick={onAddProductToOrder}
                  disabled={!canAdd}
                >
                  Add to Cart
                </button>
                <button
                  className={
                    "text-sm text-white font-medium px-5 py-3 rounded-50 border-1 bg-[#0F172A] " +
                    (!canAdd ? "hover:shadow-xl" : "opacity-60")
                  }
                  onClick={onBuy}
                  disabled={canAdd}
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button className="text-sm px-5 py-3 rounded-50 border-1 border-[#E2E8F0] hover:shadow-xl">
                  Notify when available
                </button>
                <button
                  className="text-sm  px-5 py-3 rounded-50 border-1  bg-gray-400 text-white"
                  disabled={true}
                >
                  Sold Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedItemDetail;
