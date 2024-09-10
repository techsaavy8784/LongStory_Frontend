import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import Image, { ImageProps } from "next/image";
import { useRouter } from "next/router";

const PasswordChanged = () => {
  const router = useRouter();

  const onContinue: () => void = () => {
    router.push("/users/signin");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-white px-8 py-10 flex flex-col justify-center gap-6 rounded-[18px] border-1 border-[#CBD5E1]">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex justify-center">
            <Image
              src={"/assets/images/Login/emailverify.svg"}
              width={112}
              height={112}
              alt={"verified"}
            />
          </div>
          <div className="flex flex-col text-center text-2xl leading-9 font-semibold">
            <span>Password Changed</span>
            <span>Successfully!</span>
          </div>
        </div>

        <button
          className="px-8 py-[14px] w-[356px] text-base text-white font-medium bg-black rounded-[48px] shutterOutHorizontal"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
PasswordChanged.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default PasswordChanged;
