import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product as ProductType, Variant } from "@/types/product";
import { addLike, removeLike } from "@/redux/slices/product/productSlice";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import useAuth from "@/hooks/useAuth";
import { addProductToOrder } from "@/redux/slices/order/orderSlice";
import { useRouter } from "next/router";
interface ProductProps {
  product: ProductType;
  isLast: boolean;
  newLimit: () => void;
}

export default function Product({ product, isLast, newLimit }: ProductProps) {
  const [canAdd, setCanAdd] = useState<boolean>(true);
  const [imgUrl, setImgUrl] = useState<string>("/assets/images/users/User.svg");
  const [variant, setVariant] = useState<Variant | null>(null);
  const router = useRouter();
  const productRef = useRef<HTMLDivElement | null>(null);
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  const [like, setLike] = useState<boolean>(false);
  const { user } = useAuth();
  const onLikeClick = () => {
    if (like) {
      removeLike(product.id, user?.id);
    } else {
      addLike(product.id);
    }
  };

  const onAddProductToOrder = () => {
    addProductToOrder(product.id);
  };

  const onBuy = () => {
    router.push("/mybag/");
  };

  useEffect(() => {
    let flag: boolean = true;
    if (pendingOrderDetail && pendingOrderDetail.order_items.length > 0) {
      flag =
        pendingOrderDetail.order_items.filter(
          (orderItem) => orderItem.product.id === product.id
        ).length === 0;
    }
    setCanAdd(flag);
  }, [pendingOrderDetail?.order_items]);

  useEffect(() => {
    if (!productRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(productRef.current);
  }, [isLast]);

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const filteredVariant = product.variants.filter(
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
  }, [product.variants]);

  useEffect(() => {
    setLike(
      product.likes.filter((like, index) => {
        if (like.user.id === user?.id && like.product.id === product.id) {
          return true;
        } else {
          return false;
        }
      }).length > 0
    );
  }, [product, user]);
  return (
    <>
      <div className="w-[571px] flex flex-col gap-4" ref={productRef}>
        <img
          src={imgUrl}
          alt={product.name}
          className="bg-[#EFEFEF] w-[571px] h-[571px] border-1 rounded-[24px]"
        />
        {/* users like this product */}
        <div className="flex justify-between items-center px-2 h-10">
          <div className="flex justify-start items-center">
            {product.likes.map((like, index) => {
              return (
                <img
                  key={index}
                  src={
                    like.user.avatar_url
                      ? like.user.avatar_url
                      : `/assets/images/users/User.svg`
                  }
                  alt="user1"
                  className="-ml-3 border-1 rounded-full w-[40px] h-[40px]"
                />
              );
            })}
            <p className="px-2">{product.likes.length} likes</p>
          </div>
          {/* like button */}
          <button onClick={() => onLikeClick()}>
            <Image
              src={`/assets/images/home-icon/heart.svg`}
              alt="heart"
              width={24}
              height={21}
              className={like ? "bg-orange-500" : ""}
            />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-semibold leading-9">{product.name}</div>
          {product.description && (
            <div className="text-sm text-black-2 leading-[21px] font-light">
              {product.description}&nbsp;
              <Link href={"/home"}>
                <span className="font-bold underline"> Read more </span>
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[32px] leading-[48px] font-light">
              ${" "}
              {Math.floor(
                variant && variant.inventory && variant.inventory.price
                  ? variant.inventory.price
                  : 0
              ).toLocaleString("en-US")}
            </div>
            <div className="text-base flex justify-start gap-2">
              <button
                className={
                  "border-1 border-[#E2E8F0] px-5 py-[14px] rounded-[48px] " +
                  (canAdd ? "hover:shadow-xl" : "opacity-60")
                }
                onClick={onAddProductToOrder}
                disabled={!canAdd}
              >
                Add to cart
              </button>
              <button
                className={
                  "bg-[#0F172A] text-white px-5 py-[14px] rounded-[48px] " +
                  (!canAdd ? "hover:shadow-xl" : "opacity-60")
                }
                disabled={canAdd}
                onClick={onBuy}
              >
                Buy now
              </button>
            </div>
          </div>
          <hr className="my-8" />
        </div>
      </div>
    </>
  );
}
