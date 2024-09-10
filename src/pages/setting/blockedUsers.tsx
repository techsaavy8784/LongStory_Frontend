import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import BlockedItemList from "@/components/settings/blockeduser/blockeditemlist";

const BlockedUsers = () => {
  return (
    <div className="flex">
      <div className="px-8 py-5 text-2xl font-bold  w-full fixed">
        <div className="bg-white">Blocked Users</div>
      </div>
      <div className="mt-16">
        <BlockedItemList />
      </div>
    </div>
  );
};

BlockedUsers.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default BlockedUsers;
