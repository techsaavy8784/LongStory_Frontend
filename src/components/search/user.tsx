import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User as UserType } from "@/types/user";
import { followUser, unFollowUser } from "@/redux/slices/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import useAuth from "@/hooks/useAuth";
import { Variant } from "@/types/product";

interface UserProps {
  userInfo: UserType;
  isLast: boolean;
  newLimit: () => void;
}

export default function User({ userInfo, isLast, newLimit }: UserProps) {
  const userRef = useRef<HTMLDivElement | null>(null);
  const [follow, setFollow] = useState<boolean>(false);
  const { user } = useAuth();
  const onFollowClick = () => {
    if (follow) {
      unFollowUser(userInfo.id, user?.id);
    } else {
      followUser(userInfo.id);
    }
  };
  useEffect(() => {
    if (!userRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(userRef.current);
  }, [isLast]);

  useEffect(() => {
    setFollow(
      userInfo.followers.filter((follower, index) => {
        if (follower.follower_id === user?.id) {
          return true;
        } else {
          return false;
        }
      }).length > 0
    );
  }, [user, userInfo]);
  return (
    <div
      className="w-[480px] h-[223px] border-1 border-[#F1F5F9] shadow-xl rounded-[24px] p-6 flex flex-col justify-between"
      ref={userRef}
    >
      <div className="flex  justify-start gap-4 items-center">
        <Image
          src={`/assets/images/users/User.svg`}
          alt="user"
          width={64}
          height={64}
          className="rounded-full border-2 border-[#0D9488]"
        />
        <div className="flex w-[352px] justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-[22px] leading-[33px] font-semibold">
              {userInfo.username}
            </div>
            <div className="">
              <span className="text-[16px] leading-[20.16px] font-extrabold">
                {userInfo.followers?.length}
              </span>
              <span className="text-[14px] leading-[17.64px] text-[#475569]">
                {" "}
                Followers
              </span>
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-[48px] bg-gray-900 text-[14px] leading-[21px] font-medium text-white hover:shadow-xl"
            onClick={onFollowClick}
          >
            {follow ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="flex justify-start ">
        {userInfo.likes.map((like, index) => {
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
          return index < 5 ? (
            <img
              src={imgUrl}
              alt="user"
              className="rounded-full border-1 border-[#E2E8F0] w-[79px] h-[79px] -ml-[20.17px]"
              key={index}
            />
          ) : (
            <div key={index}></div>
          );
        })}
        {userInfo.likes.length > 5 && (
          <div className="flex justify-center items-center w-[79px] h-[79px] border-1 border-[#E2E8F0] -ml-[20.17px] rounded-full bg-white">
            <span className="text-[18px] leading-[22.68px] font-extrabold">
              +{userInfo.likes?.length - 5}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
