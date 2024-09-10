import Image from "next/image";
import { Follow, User } from "@/types/user";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import {
  fetchFollowers,
  updateFollower,
} from "@/redux/slices/user/followSlice";
import { useRouter } from "next/router";
const Follower = ({ follow }: { follow: Follow }) => {
  const [followerUser, setFollowerUser] = useState<User>();
  const followers = useAppSelector((state) => state.follow.followers);
  const router = useRouter();
  const { p, followee, search } = router.query;

  const getFollowerUser = async () => {
    const response = await axios.get(`/api/users/${follow.follower_id}`);
    setFollowerUser(response.data);
  };

  const handleFollow = async () => {
    updateFollower(follow);
    fetchFollowers(p as string, search as string);
  };

  useEffect(() => {
    console.log(follow);
    getFollowerUser();
  }, [follow]);
  return (
    <div className="flex gap-4 items-center">
      <img
        src={
          followerUser && followerUser.avatar_url
            ? followerUser.avatar_url
            : `/assets/images/users/User.svg`
        }
        alt="user"
        className="w-16 h-16 rounded-full"
      />
      <div className="flex justify-between">
        <div className="w-[301px]">
          <div className="text-[18px] leading-[27px] font-semibold">
            {followerUser ? followerUser.username : ""}
          </div>
          <div className="text-[12px] leading-[18px] font-semibold text-[#475569]">
            <span className="font-bold text-black">
              {followerUser ? followerUser.likes.length : 0}
            </span>
            {" followers"}
          </div>
        </div>
        <button
          className="px-[18px] py-[10px] rounded-[48px] text-[14px] leading-[21px] border-1 border-[#E2E8F0] hover:shadow-xl"
          onClick={handleFollow}
        >
          {follow.is_accepted ? "Block" : "Follow"}
        </button>
      </div>
    </div>
  );
};
export default Follower;
