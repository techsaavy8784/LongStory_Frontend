import LikedItemDetail from "./likeitemdetail";
import { useAppSelector } from "@/types/hooks";
import { useEffect } from "react";
import { fetchLikes } from "@/redux/slices/user/likeSlice";

export default function LikedItemList() {
  const likes = useAppSelector((state) => state.like.likes);
  console.log(likes);

  useEffect(() => {
    fetchLikes();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-8 p-14">
        {likes.map((like, index) => {
          return (
            <div className="flex flex-col gap-8" key={index}>
              <LikedItemDetail like={like} />
              {index < likes.length - 1 && <hr />}
            </div>
          );
        })}
        {likes.length === 0 && <div>There are no liked Items</div>}
      </div>
    </>
  );
}
