import dynamic from "next/dynamic";
import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";

const TerminalComponent = dynamic(() => import("@/components/persona"), {
  ssr: false,
});

const Persona = () => {
  return <TerminalComponent />;
};
Persona.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};
export default Persona;
