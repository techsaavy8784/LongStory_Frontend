import useAuth from "@/hooks/useAuth";
import { fetchLikes } from "@/redux/slices/user/likeSlice";
import { useAppSelector } from "@/types/hooks";
import { useEffect } from "react";
import { Variant } from "@/types/product";

const Products = () => {
  const likes = useAppSelector((state) => state.like.likes);

  useEffect(() => {
    fetchLikes();
  }, []);
  return (
    <div className="flex justify-start items-center flex-wrap gap-14">
      {likes.map((like, index) => {
        let variant: Variant | undefined = undefined;
        let imgUrl: string = "/assets/images/users/User.svg";
        if (like.product.variants && like.product.variants.length > 0) {
          const filteredVariant = like.product.variants.filter(
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
          <img
            key={index}
            src={imgUrl}
            alt={like.product.name}
            className="w-[140px] h-[140px] rounded-full border-1 border-[#E2E8F0]"
          />
        );
      })}
    </div>
  );
};
export default Products;
