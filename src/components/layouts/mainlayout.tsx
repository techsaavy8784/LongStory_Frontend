// ==============================|| MainLayout - STRUCTURE ||============================== //
import Menu from "./menu";
export default function MainLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <Menu>{children}</Menu>;
}
