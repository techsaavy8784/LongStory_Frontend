import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import SponsorShipList from "@/components/settings/sponsorship/sponsorshiplist";

const SponsorShip = () => {
  return (
    <div className="flex">
      <div className="px-8 py-5 text-2xl font-bold  w-full fixed">
        <div className="bg-white">Sponsorship</div>
      </div>
      <div className="mt-16">
        <SponsorShipList />
      </div>
    </div>
  );
};

SponsorShip.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default SponsorShip;
