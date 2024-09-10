import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import ProfileLayout from "@/components/layouts/user/profileLayout";
import ProfileCard from "@/components/user/profileCard";
import Products from "@/components/user/products";
import {
  fetchFollowees,
  fetchFollowers,
  fetchFollowsCount,
} from "@/redux/slices/user/followSlice";
import { fetchLikes } from "@/redux/slices/user/likeSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Followees from "@/components/user/followees";
import Followers from "@/components/user/followers";

const ProfilePage = () => {
  const router = useRouter();
  const { follower_id, followee_id, p, search, follower, followee } =
    router.query;
  useEffect(() => {
    fetchLikes();
    fetchFollowsCount();
    if (followee) {
      fetchFollowees(p as string, search as string);
    }
    if (follower) {
      fetchFollowers(p as string, search as string);
    }
  }, [follower, followee, p, search]);
  return (
    <>
      {followee && <Followees />}
      {follower && <Followers />}
      <div>
        <ProfileLayout>
          <ProfileCard />
          <hr className="text-[#CBD5E1]" />
          <Products />
        </ProfileLayout>
      </div>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default ProfilePage;
