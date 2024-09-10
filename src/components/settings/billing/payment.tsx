import { methods } from "@/components/mybag/payment/payment";
import { Payment } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { setAsDefault } from "@/redux/slices/user/paymentSlice";

const Payment = ({ payment }: { payment: Payment }) => {
  const router = useRouter();

  const onEditPayment = () => {
    if (payment.method === "card") {
      router.push(`/setting/billing/editPayment?id=${payment.id}`);
    } else {
      router.push(`/setting/billing/addPayment/paypal?id=${payment?.id}`);
    }
  };
  const onSetDefaultPayment = async () => {
    // const is_default = payment.is_default;
    // console.log(payment.id, payment.is_default);
    try {
      setAsDefault(payment.id);
    } catch (err: any) {
      console.log(err);
    }
  };
  return payment.method ? (
    <div
      className={
        "px-6 py-4 flex justify-between w-full text-[#0F172A] " +
        (payment.is_default ? "bg-[#F1F5F9]" : "bg-white")
      }
    >
      <div className="flex justify-start gap-2 items-center">
        <Image
          src={`/assets/images/bill/${payment.method}.svg`}
          width={methods[payment.method].width1}
          height={methods[payment.method].height1}
          alt={payment.method}
        />
        <div className="text-sm leading-[21px]">
          {methods[payment.method].name} ending with
        </div>
        <div className="text-base leading-[20.16px] font-semibold">
          ****
          {payment.provider.slice(
            -methods[payment.method].countOfShowingLetters
          )}
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <button
          className={
            "px-4 py-2 rounded-[48px] text-sm text-black leading-[21px] border-1 border-[#E2E8F0] hover:shadow-xl " +
            (payment.is_default ? "bg-[#E2E8F0]" : "bg-white")
          }
          onClick={onSetDefaultPayment}
        >
          {payment.is_default ? "Default" : "Set as Default"}
        </button>
        <button
          className="px-4 text-sm py-2 rounded-[48px] text-white leading-[21px] bg-[#0F172A] hover:shadow-xl"
          onClick={onEditPayment}
        >
          Edit
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Payment;
