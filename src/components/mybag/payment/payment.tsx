import Image from "next/image";
import { Payment as PaymentInterface } from "@/types/user";
import { useRouter } from "next/router";

interface MethodInterface {
  width: number;
  height: number;
  width1: number;
  height1: number;
  name?: string;
  countOfShowingLetters: number;
  title?: string;
}
export interface MethodsInterface {
  masterCard: MethodInterface;
  visa: MethodInterface;
  wire: MethodInterface;
  paypal: MethodInterface;
  applepay: MethodInterface;
  card: MethodInterface;
}
export const methods: MethodsInterface = {
  masterCard: {
    width: 51.85,
    height: 32,
    width1: 32,
    height1: 32,
    name: "Master Card",
    title: "Master Card",
    countOfShowingLetters: 4,
  },
  visa: {
    width: 78,
    height: 32,
    width1: 32,
    height1: 32,
    name: "Visa Card",
    title: "Visa Card",
    countOfShowingLetters: 4,
  },
  card: {
    width: 40,
    height: 40,
    width1: 32,
    height1: 32,
    name: "Master Card",
    title: "Credit/Debit Card",
    countOfShowingLetters: 4,
  },
  paypal: {
    width: 120.5,
    height: 40,
    width1: 96.38,
    height1: 32,
    title: "Paypal",
    name: "Paypal account email",
    countOfShowingLetters: 12,
  },
  applepay: {
    width: 78.02,
    height: 32,
    width1: 32,
    height1: 32,
    name: "Apple Pay account",
    title: "Apple Pay",
    countOfShowingLetters: 4,
  },
  wire: {
    width: 51.52,
    height: 32,
    width1: 32,
    height1: 32,
    name: "Direct US Bank account",
    title: "Direct US Bank",
    countOfShowingLetters: 4,
  },
};
const Payment = ({
  payment,
  selected,
  changeSelection,
}: {
  payment: PaymentInterface;
  selected: number | undefined;
  changeSelection: (e: any) => void;
}) => {
  const router = useRouter();
  const onEditPayment = () => {
    if (payment.method === "card") {
      router.push(`/setting/billing/editPayment?id=${payment.id}`);
    } else {
      router.push(`/setting/billing/addPayment/paypal?id=${payment?.id}`);
    }
  };
  return payment.method ? (
    <div className="w-full flex justify-between items-center">
      <div className="flex justify-start gap-2 items-center">
        <input
          type="radio"
          name="payment"
          id={`${payment.id}`}
          value={payment.id}
          onChange={changeSelection}
          checked={payment.id === Number(selected)}
        />
        <label
          htmlFor={`${payment.id}`}
          className="flex justify-start gap-2 items-center"
        >
          <Image
            src={`/assets/images/bill/${payment.method}.svg`}
            width={methods[payment.method].width1}
            height={methods[payment.method].height1}
            alt={payment.method}
          />
          <div>{methods[payment.method].name} ending with</div>
          <div className="text-[16px] leading-[20.16px] font-semibold">
            ****
            {payment.provider.slice(
              -methods[payment.method].countOfShowingLetters
            )}
            {payment.is_default ? "(Default)" : ""}
          </div>
        </label>
      </div>
      <button
        className="px-5 py-[14px] border border-[#E2E8F0] rounded-[48px] text-base hover:bg-gray-900 hover:text-white"
        onClick={onEditPayment}
      >
        Edit Details
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default Payment;
