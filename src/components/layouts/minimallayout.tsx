// ==============================|| Minimal Layout - STRUCTURE ||============================== //
import Menu from "./menu";
import SortBar from "../home/sortBar";
import { Products } from "@/components/home/products";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
export default function MinimalLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [layout, setLayout] = useState(1);
  useEffect(() => {
    if (user && user.auth_status >= 4) {
      setLayout(2);
    }
  }, [user]);
  return (
    <div>
      <div className="fixed w-full h-screen z-20">{children}</div>
      {layout === 2 && (
        <div className="blur-lg">
          <Menu>
            <div className="flex ml-8">
              <div className="w-80">
                <div className="fixed">
                  <SortBar />
                </div>
              </div>
              <div className="mt-28">
                <Products />
              </div>
            </div>
          </Menu>
        </div>
      )}
      {layout === 1 && (
        <div className="w-screen h-screen blur-lg bg-[#C8C1B9] flex justify-center items-center">
          <Image
            src={"/assets/images/background.svg"}
            width={1522.15}
            height={1080}
            alt={"background"}
          />
        </div>
      )}
    </div>
  );
}
