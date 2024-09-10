import Image from "next/image";
import { Follow, User } from "@/types/user";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { fetchFollowees } from "@/redux/slices/user/followSlice";
import { useRouter } from "next/router";

const Followee = ({ follow }: { follow: Follow }) => {
  const [followeeUser, setFolloweeUser] = useState<User>();
  const followees = useAppSelector((state) => state.follow.followees);
  const router = useRouter();
  const { p, followee, search } = router.query;
  const getFolloweeUser = async () => {
    const response = await axios.get(`/api/users/${follow.followee_id}`);
    setFolloweeUser(response.data);
  };

  const onUnfollow = async () => {
    const response = await axios.delete(
      `/api/users/followees/${follow.followee_id}`
    );
    if (followees.length > 1) {
      fetchFollowees(p as string, search as string);
    } else {
      if (Number(p) === 1) {
        fetchFollowees(Number(p), search as string);
      } else if (Number(p) > 1) {
        let url = "/users/profile?followee=true&p=" + (Number(p) - 1);
        if (search) {
          url += `&search=${search}`;
        }
        router.push(url);
      }
    }
  };

  useEffect(() => {
    getFolloweeUser();
  }, [follow]);
  return (
    <div className="flex gap-4 items-center">
      <img
        src={
          followeeUser && followeeUser.avatar_url
            ? followeeUser.avatar_url
            : `/assets/images/users/User.svg`
        }
        alt="user"
        className="w-16 h-16 rounded-full"
      />
      <div className="flex justify-between">
        <div className="w-[301px]">
          <div className="text-[18px] leading-[27px] font-semibold">
            {followeeUser ? followeeUser.username : ""}
          </div>
          <div className="text-[12px] leading-[18px] font-semibold text-[#475569]">
            <span className="font-bold text-black">
              {followeeUser ? followeeUser.likes.length : 0}
            </span>
            {" followers"}
          </div>
        </div>
        <button
          className="px-[18px] py-[10px] rounded-[48px] text-white text-[14px] leading-[21px] bg-black hover:shadow-xl"
          onClick={onUnfollow}
        >
          Unfollow
        </button>
      </div>
    </div>
  );
};
export default Followee;
