import useAuth from "@/hooks/useAuth";

import { useAppSelector } from "@/types/hooks";

import { useRouter } from "next/router";

const ProfileCard = () => {
  const { user } = useAuth();
  const likes = useAppSelector((state) => state.like.likes);
  const followers_total_count = useAppSelector(
    (state) => state.follow.followers_total_count
  );
  const followees_total_count = useAppSelector(
    (state) => state.follow.followees_total_count
  );
  const router = useRouter();

  const onEditProfile = () => {
    router.push("/setting/profileSetting");
  };

  const onClickFollowees = () => {
    router.push("/users/profile?followee=true&p=1", undefined, {
      shallow: true,
    });
  };
  const onClickFollowers = () => {
    router.push("/users/profile?follower=true&p=1", undefined, {
      shallow: true,
    });
  };

  return (
    <div className="flex w-full justify-center items-start gap-4">
      <img
        src={
          user?.avatar_url ? user.avatar_url : "/assets/images/users/User.svg"
        }
        alt={user ? user.username : "avatar"}
        className="w-[140px] h-[140px] rounded-full border-1"
      />
      <div className="flex flex-col gap-3 w-[350px]">
        <div className="flex justify-between">
          <span className="text-[22px] leading-[33px] font-semibold">
            {user?.username}
          </span>
          <button
            className="px-[14px] py-2 border-1 border-black rounded-[48px] leading-[21px] text-[14px] hover:shadow-xl"
            onClick={onEditProfile}
          >
            Edit Profile
          </button>
        </div>
        <div className="text-[14px] leading-[21px] text-[#0F172A]">
          You can write anything here, like status or type of products you like{" "}
        </div>
        <div className="flex justify-between">
          <button className="">
            <span className="leading-[20.16px] font-extrabold">
              {likes.length}
            </span>
            <span className="text-[14px] leading-[17.64px] text-[#475569]">
              {" Products"}
            </span>
          </button>
          <button className="" onClick={onClickFollowers}>
            <span className="leading-[20.16px] font-extrabold">
              {followers_total_count}
            </span>
            <span className="text-[14px] leading-[17.64px] text-[#475569]">
              {" Followers"}
            </span>
          </button>
          <button className="" onClick={onClickFollowees}>
            <span className="leading-[20.16px] font-extrabold">
              {followees_total_count}
            </span>
            <span className="text-[14px] leading-[17.64px] text-[#475569]">
              {" Following"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
