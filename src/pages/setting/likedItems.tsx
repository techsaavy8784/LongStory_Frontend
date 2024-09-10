import SortBar from "@/components/home/sortBar";
import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import LikedItemList from "@/components/settings/likeditem/likeitemlist";

const LikedItems = () => {
  return (
    <div className="flex">
      <div className="px-8 py-5 text-2xl font-bold fixed w-full">
        <div className="bg-white">Liked Items</div>
      </div>
      <div className="mt-16">
        <LikedItemList />
      </div>
    </div>
  );
};

LikedItems.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default LikedItems;
