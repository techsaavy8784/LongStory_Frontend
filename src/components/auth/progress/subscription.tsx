import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import InputField from "@/components/InputField";
import PaymentSelection from "@/components/auth/paymentSelection";
import Checkout from "@/components/checkout";
import PaymentForm from "@/components/paymentForm";

const Subscription = () => {
  const router = useRouter();
  const { updateProfile, user } = useAuth();

  // const onSubscribe = async () => {
  //   try {
  //     updateProfile({ auth_status: 7 });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-white px-8 py-10 flex flex-col justify-center gap-6 rounded-[18px] border-1 border-[#CBD5E1]">
        <div className="text-[28px] leading-[39.2px] font-bold text-center">
          First payment due today
        </div>
        <PaymentSelection methodType="card" />

        <div className="flex flex-col gap-4 m-auto w-[500px]">
          {/* <InputField img="name" placeholder="Enter full name" />
          <InputField img="card" placeholder="Enter 14 digit card number" />
          <InputField img="date" placeholder="Enter expiry date" />
          <InputField img="password" placeholder="Enter 3 digits code" /> */}
          <Checkout>
            <PaymentForm actionType={"subscription"} />
          </Checkout>
        </div>

        {/* <button
          className="px-8 py-[14px] w-[356px] text-base text-white font-medium bg-black rounded-[48px] hover:shadow-xl m-auto"
          onClick={onSubscribe}
        >
          Buy Subscription
          <span className="font-semibold text-sm">$1000/Month</span>
        </button> */}
      </div>
    </div>
  );
};

export default Subscription;
